import { query } from "@/app/db";
import { Suspense } from "react";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";

interface ClosedTickets {
  ID: number;
  SolvedDescription: string;
  Title: string;
}

async function ClosedTicketsList() {
  const closedTickets = await query<ClosedTickets[]>(
    "SELECT * FROM ClosedTickets",
  );

  return (
    <div className="grid gap-2">
      {closedTickets.map((closedTickets) => (
        <div
          key={closedTickets.ID}
          className="p-4 bg-slate-800 rounded border border-slate-700"
        >
          <p className="font-semibold text-lg">{closedTickets.ID}</p>
          <p className="font-semibold text-lg">{closedTickets.Title}</p>
          <p className="text-md text-white/80">
            {closedTickets.SolvedDescription}
          </p>
          <Link
            href={`/admin/documentation/${closedTickets.ID}`}
            className="inline-block mt-3 border border-black bg-blue-900 rounded-md p-2 hover:bg-blue-700 text-center"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <main>
      <div className="p-4 text-white bg-slate-900 min-h-screen">
        <div className=" relative mb-4 flex flex-row items-center">
          <h1 className="text-2xl font-bold">Closed Tickets</h1>
          <div className="absolute right-0 flex gap-2">
            <a
              href="/admin"
              className="border border-black bg-blue-900 rounded-md p-2 hover:cursor-pointer text-center"
            >
              Back to admin
            </a>
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-blue-400/70" />

        <Suspense
          fallback={<p className="text-white">Loading Closed Tickets...</p>}
        >
          <ClosedTicketsList />
        </Suspense>
      </div>
    </main>
  );
}
