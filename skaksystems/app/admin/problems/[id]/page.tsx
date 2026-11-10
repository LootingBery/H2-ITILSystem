import { pool, query } from "@/app/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";
import { Suspense } from "react";

interface problems {
  ID: number;
  Title: string;
  Description: string;
}

export const instant = false;
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
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

async function ProblemDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const problems = await query<problems[]>(
    "SELECT * FROM Problems WHERE ID = ?",
    [id],
  );

  const problem = problems[0];
  if (!problem) {
    notFound();
  }

  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white scrollbar-none">
      <h1 className="text-2xl font-bold mb-4">Problem ID: {problem.ID}</h1>

      <div className="bg-slate-800 p-4 rounded border border-slate-700">
        <p>
          <strong className="text-blue-400">Title:</strong> {problem.Title}
        </p>

        <p>
          <strong className="text-blue-400">Description:</strong>{" "}
          {problem.Description}
        </p>
      </div>
      <Link
        href="/admin/problems"
        className="inline-block mt-4 p-2 bg-blue-900 rounded"
      >
        Back to problems
      </Link>
    </main>
  );
}
