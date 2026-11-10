import { pool } from "@/app/db";
import { getSession } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface Ticket extends RowDataPacket {
  ID: number;
  AssignedLevel: number;
}

interface Employee extends RowDataPacket {
  Level: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const ticketId = Number(id);

  if (!/^\d+$/.test(id) || !Number.isSafeInteger(ticketId) || ticketId <= 0) {
    return NextResponse.json({ error: "Invalid ticket ID" }, { status: 400 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 },
    );
  }

  const { level, reason } = body as {
    level?: unknown;
    reason?: unknown;
  };

  if (
    typeof level !== "number" ||
    ![1, 2, 3].includes(level) ||
    typeof reason !== "string" ||
    !reason.trim() ||
    reason.trim().length > 2000
  ) {
    return NextResponse.json(
      { error: "Invalid level or reason (maximum 2000 characters)" },
      { status: 400 },
    );
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [employeeRows] = await connection.execute<Employee[]>(
      "SELECT Level FROM Employees WHERE ID = ?",
      [session.employeeId],
    );

    const employee = employeeRows[0];
    const employeeLevel = Number(employee?.Level ?? 0);

    if (!employee || ![1, 2, 3].includes(employeeLevel)) {
      await connection.rollback();

      return NextResponse.json(
        { error: "Employee does not have permission" },
        { status: 403 },
      );
    }

    const [ticketRows] = await connection.execute<Ticket[]>(
      "SELECT ID, AssignedLevel FROM Tickets WHERE ID = ? FOR UPDATE",
      [ticketId],
    );

    const ticket = ticketRows[0];

    if (!ticket) {
      await connection.rollback();

      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    if (employeeLevel < Number(ticket.AssignedLevel)) {
      await connection.rollback();

      return NextResponse.json(
        { error: "You cannot forward a ticket above your level" },
        { status: 403 },
      );
    }

    if (Number(ticket.AssignedLevel) === level) {
      await connection.rollback();

      return NextResponse.json(
        { error: "Ticket is already assigned to this level" },
        { status: 400 },
      );
    }

    await connection.execute(
      `UPDATE Tickets
    SET AssignedLevel = ?
    WHERE ID = ?`,
      [level, ticketId],
    );

    await connection.execute(
      `INSERT INTO TicketForwardHistory
    (TicketID, ForwardedBy, ForwardedToLevel, Reason)
    VALUES (?, ?, ?, ?)`,
      [ticketId, session.employeeId, level, reason.trim()],
    );

    await connection.commit();

    return NextResponse.json({
      success: true,
      message: "Ticket forwarded successfully",
    });
  } catch (error) {
    await connection.rollback();

    console.error("Error forwarding ticket:", error);

    return NextResponse.json(
      { error: "Failed to forward ticket" },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}
