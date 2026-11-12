import { pool, query } from "@/app/db";
import { Suspense } from "react";
import Link from "next/link";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import DeleteProblemButton from "./DeleteProblemButton";
import Navbar from "../navbar";

interface Problems {
  ID: number;
  Title: string;
  Description: string;
  ClosedTicketCount: number;
}

async function ProblemsList() {
  const session = await getSession();
  let level = "";

  if (session) {
    const [rows] = await pool.execute(
      "SELECT Level FROM Employees WHERE ID = ?",
      [session.employeeId],
    );

    const employees = rows as { Level: string }[];

    level = employees[0]?.Level ?? "";
  }
  const Problems = await query<Problems[]>(
    `SELECT Problems.ID, Problems.Title, Problems.Description,
            COUNT(ClosedTickets.ID) AS ClosedTicketCount
     FROM Problems
     LEFT JOIN ClosedTickets ON ClosedTickets.ProblemID = Problems.ID
     GROUP BY Problems.ID, Problems.Title, Problems.Description`,
  );
  if (Problems.length === 0) {
    return (
      <div className="text-center font-semibold text-5xl mt-20 text-white/80">
        No problems found.
      </div>
    );
  }
  return (
    <div className="grid relative gap-2">
      {Problems.map((Problems) => (
        <div
          key={Problems.ID}
          className="relative p-4 bg-slate-800 rounded border border-slate-700"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-sm text-gray-400 text-sm">
              Problem ID: {Problems.ID}
            </p>
            <p className="font-sm text-gray-400 text-sm">
              Tickets associated with this problem:{" "}
              <span className="font-bold text-blue-400">
                {Problems.ClosedTicketCount}
              </span>
            </p>
          </div>
          <p className="font-semibold text-lg">{Problems.Title}</p>

          <p className="text-sm text-slate-400">{Problems.Description}</p>
          <br />
          <div className="flex justify-between gap-2">
            <Link
              href={`/admin/problems/${Problems.ID}`}
              className="border border-black bg-blue-900 rounded-md p-2 hover:bg-blue-700 text-center hover:cursor-pointer"
            >
              View Problems
            </Link>
            {Number(level) >= 3 && (
              <DeleteProblemButton problemId={Problems.ID} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export const instant = false;
export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <Navbar />
      <div className="ml-[260px] px-6 pb-10 pt-[77px] max-md:ml-[65px] max-md:px-4">
        <div className="p-4 text-white bg-slate-900 min-h-screen">
          <div className="mb-4 flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Problems</h1>
            <div className="flex gap-2">
              <Link
                href="/admin/problems/add"
                className="border border-black bg-blue-900 rounded-md p-2"
              >
                Add Problem List
              </Link>
              <Link
                href="/admin"
                className="border border-black bg-blue-900 rounded-md p-2"
              >
                Back to admin
              </Link>
            </div>
          </div>

          <div className="mb-6 h-px w-full bg-blue-400/70" />

          <Suspense
            fallback={<p className="text-white">Loading Problems...</p>}
          >
            <ProblemsList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
