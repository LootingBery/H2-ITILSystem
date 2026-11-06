import { pool } from "@/app/db";
import { getSession } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
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
  const body = await request.json();

  const priority = Number(body.priority);

  if (!Number.isInteger(priority) || priority < 1 || priority > 4) {
    return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
  }

  const [rows] = await pool.execute("SELECT ID FROM Tickets WHERE ID = ?", [
    id,
  ]);

  const tickets = rows as { ID: number }[];

  if (tickets.length === 0) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  await pool.execute("UPDATE Tickets SET Priority = ? WHERE ID = ?", [
    priority,
    id,
  ]);

  return NextResponse.json({
    message: "Priority successfully updated",
  });
}
