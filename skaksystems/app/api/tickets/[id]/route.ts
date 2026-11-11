import { pool } from "@/app/db";
import { getSession } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
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

  const body = await request.json();
  const rawProblemId = body.problemId;
  const problemId =
    rawProblemId === null || rawProblemId === undefined || rawProblemId === ""
      ? null
      : Number(rawProblemId);

  if (
    problemId !== null &&
    (!Number.isInteger(problemId) || problemId <= 0)
  ) {
    return NextResponse.json({ error: "Invalid problem ID" }, { status: 400 });
  }

  try {
    const [tickets] = await pool.execute(
      "SELECT ID FROM ClosedTickets WHERE ID = ?",
      [ticketId],
    );

    if ((tickets as { ID: number }[]).length === 0) {
      return NextResponse.json(
        { error: "Closed ticket not found" },
        { status: 404 },
      );
    }

    if (problemId !== null) {
      const [problems] = await pool.execute(
        "SELECT ID FROM Problems WHERE ID = ?",
        [problemId],
      );

      if ((problems as { ID: number }[]).length === 0) {
        return NextResponse.json(
          { error: "Problem not found" },
          { status: 404 },
        );
      }
    }

    await pool.execute("UPDATE ClosedTickets SET ProblemID = ? WHERE ID = ?", [
      problemId,
      ticketId,
    ]);

    return NextResponse.json({ message: "Problem updated successfully" });
  } catch (error) {
    console.error("Error updating closed ticket problem:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

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
