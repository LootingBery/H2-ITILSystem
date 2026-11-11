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
  const problemId = Number(id);

  if (!Number.isInteger(problemId) || problemId <= 0) {
    return NextResponse.json({ error: "Invalid problem ID" }, { status: 400 });
  }

  try {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      await connection.execute(
        "UPDATE ClosedTickets SET ProblemID = NULL WHERE ProblemID = ?",
        [problemId],
      );

      const [result] = await connection.execute(
        "DELETE FROM Problems WHERE ID = ?",
        [problemId],
      );

      if ("affectedRows" in result && result.affectedRows === 0) {
        await connection.rollback();

        return NextResponse.json(
          { error: "Problem not found" },
          { status: 404 },
        );
      }

      await connection.commit();

      return NextResponse.json({
        message: "Problem deleted successfully",
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error deleting problem:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
