import { pool } from "@/app/db";
import { getSession } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 },
    );
  }

  const { id } = await params;
  const ticketId = Number(id);

  if (!Number.isInteger(ticketId) || ticketId <= 0) {
    return NextResponse.json({ error: "Invalid ticket ID" }, { status: 400 });
  }

  try {
    const [result] = await pool.execute("DELETE FROM Tickets WHERE ID = ?", [
      ticketId,
    ]);

    if ("affectedRows" in result && result.affectedRows === 0) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
