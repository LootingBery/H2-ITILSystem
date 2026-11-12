import { pool, query } from "@/app/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";
import { Suspense, type ComponentType } from "react";
import CloseProblemForm from "./CloseProblemForm";
import EditProblemSolvedDescription from "./EidtProblemSolvedDesciption";

const ProblemForm = CloseProblemForm as unknown as ComponentType<{
  problemId: number | null;
}>;

interface problems {
  ID: number;
  Title: string;
  Description: string;
  SolvedDescription: string;
}

interface ClosedTickets {
  ID: number;
  Title: string;
  Description: string;
  Forename: string;
  Surname: string;
  Mail: string;
  Phone: string;
  SolvedDescription: string;
  ClosedByForename: string;
  ClosedBySurname: string;
  ClosedAt: Date | string;
  ProblemID: number;
}

export const instant = false;
export default async function Page({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <Suspense
      fallback={
        <main className="p-8 min-h-screen bg-slate-900 text-white">
          <p>Loading problems...</p>
        </main>
      }
    >
      <ProblemDetails params={params} />
    </Suspense>
  );
}

async function ProblemDetails({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const { problemId } = await params;

  const problems = await query<problems[]>(
    "SELECT * FROM Problems WHERE ID = ?",
    [problemId],
  );

  const ClosedTickets = await query<ClosedTickets[]>(
    "SELECT * FROM ClosedTickets WHERE ProblemID = ?",
    [problemId],
  );

  const problem = problems[0];
  if (!problem) {
    notFound();
  }

  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white scrollbar-none">
      <div className="mb-4 flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Problem ID: {problem.ID}</h1>

        <Link
          href="/admin/problems"
          className="inline-block p-2 bg-blue-900 rounded"
        >
          Back to problems
        </Link>
      </div>
      <div className="bg-slate-800 p-4 rounded border border-slate-700">
        <div className="bg-slate-800 p-4 rounded border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">Closed Tickets</h2>
        </div>
        <br />
        <p>
          <strong className="text-blue-400">Title:</strong> {problem.Title}
        </p>
        <p>
          <strong className="text-blue-400">Description:</strong>{" "}
          {problem.Description}
        </p>
        <br />
        <div className="justify-between flex flex-row items-center">
          <CloseProblemForm
            problemId={problem.ID}
            solvedDescription={problem.SolvedDescription}
          />
          <EditProblemSolvedDescription
            problemId={problem.ID}
            solvedDescription={problem.SolvedDescription}
          />
        </div>
        <br />
        <div className="bg-slate-800 p-4 rounded border border-slate-700 mt-4">
          <h2 className="text-xl font-semibold mb-2">Tickets</h2>
          {ClosedTickets.length === 0 ? (
            <p>No closed tickets found for this problem.</p>
          ) : (
            <div className="grid gap-2">
              {ClosedTickets.map((ticket) => (
                <div
                  key={ticket.ID}
                  className="rounded border border-slate-700 bg-slate-800 p-4"
                >
                  Closed Tickets ID: {ticket.ID}
                  <p className="text-lg font-semibold">{ticket.Title}</p>
                  <p className="text-white/80">{ticket.SolvedDescription}</p>
                  <Link
                    href={`/admin/problems/${problem.ID}/${ticket.ID}`}
                    className="mt-3 inline-block rounded-md bg-blue-900 p-2 text-center hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
