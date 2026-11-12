import { pool } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";

interface Problem {
  ID: number;
  Title: string;
  Description: string;
  SolvedDescription: string;
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

  const { SolvedDescription, ProblemID: rawProblemID } = body;

  if (!SolvedDescription || !SolvedDescription.trim()) {
    return NextResponse.json(
      { error: "Please describe how the problem was solved" },
      { status: 400 },
    );
  }

  const problemId =
    rawProblemID === null || rawProblemID === undefined || rawProblemID === ""
      ? null
      : Number(rawProblemID);

  if (problemId !== null && (!Number.isInteger(problemId) || problemId <= 0)) {
    return NextResponse.json(
      { error: "Please select a valid problem" },
      { status: 400 },
    );
  }

  if (problemId !== null) {
    const [problemRows] = await pool.execute(
      "SELECT ID FROM Problems WHERE ID = ?",
      [problemId],
    );

    if ((problemRows as { ID: number }[]).length === 0) {
      return NextResponse.json(
        { error: "Selected problem was not found" },
        { status: 400 },
      );
    }
  }

  const [rows] = await pool.execute("SELECT * FROM Problems WHERE ID = ?", [
    id,
  ]);

  const problems = rows as Problem[];

  const problem = problems[0];

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.execute(
      `UPDATE Problems SET SolvedDescription = ? WHERE ID = ?`,
      [SolvedDescription.trim(), id],
    );
    await connection.commit();

    return NextResponse.json({
      message: "Problem successfully closed",
    });
  } catch (error) {
    console.error("Error closing problem:", error);

    await connection.rollback();

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}
