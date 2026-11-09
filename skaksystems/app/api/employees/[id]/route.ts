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

  const [sessionRows] = await pool.execute(
    "SELECT Level FROM Employees WHERE ID = ?",
    [session.employeeId],
  );
  const currentEmployee = (sessionRows as { Level: string }[])[0];

  if (!currentEmployee || Number(currentEmployee.Level) < 3) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { id } = await params;
  const employeeId = Number(id);

  if (!Number.isInteger(employeeId) || employeeId <= 0) {
    return NextResponse.json({ error: "Invalid employee ID" }, { status: 400 });
  }

  if (employeeId === session.employeeId) {
    return NextResponse.json(
      { error: "You cannot delete your own account" },
      { status: 400 },
    );
  }

  try {
    const [result] = await pool.execute("DELETE FROM Employees WHERE ID = ?", [
      employeeId,
    ]);

    if ("affectedRows" in result && result.affectedRows === 0) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
