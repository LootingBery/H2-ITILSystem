import { pool } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";

interface Ticket {
  ID: number;
  Title: string;
  Description: string;
  Forename: string;
  Mail: string;
  Phone: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 },
    );
  }

  const body = await request.json();

  const { SolvedDescription } = body;

  if (!SolvedDescription || !SolvedDescription.trim()) {
    return NextResponse.json(
      { error: "Please describe how the problem was solved" },
      { status: 400 },
    );
  }

  const [rows] = await pool.execute("SELECT * FROM Tickets WHERE ID = ?", [id]);

  const tickets = rows as Ticket[];

  const ticket = tickets[0];

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(
      `INSERT INTO ClosedTickets
      (ID, Title, Description, Forename, Mail, Phone, SolvedDescription, ClosedBy, ClosedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [
        ticket.ID,
        ticket.Title,
        ticket.Description,
        ticket.Forename,
        ticket.Mail,
        ticket.Phone,
        SolvedDescription,
        session.employeeId,
      ],
    );
    await connection.execute("DELETE FROM Tickets WHERE ID = ?", [ticket.ID]);
    await connection.commit();

    return NextResponse.json({
      message: "Ticket successfully closed",
    });
  } catch (error) {
    console.error("Error closing ticket:", error);

    await connection.rollback();

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}
