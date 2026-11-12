import { query } from "@/app/db";
import { Suspense } from "react";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Navbar from "../navbar";

interface ClosedTickets {
  ID: number;
  SolvedDescription: string;
  Title: string;
}

async function ClosedTicketsList({ search }: { search: string }) {
  const closedTickets = await query<ClosedTickets[]>(
    `SELECT ID, Title, SolvedDescription
    FROM ClosedTickets
    WHERE Title LIKE ?
    OR SolvedDescription LIKE ?
    OR CAST(ID AS CHAR) LIKE ?
    ORDER BY ID DESC`,
    [`%${search}%`, `%${search}%`, `%${search}%`],
  );

  if (closedTickets.length === 0) {
    return (
      <div className="mt-20 text-center text-2xl font-semibold text-white/80">
        No closed tickets found.
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {closedTickets.map((ticket) => (
        <div
          key={ticket.ID}
          className="rounded border border-slate-700 bg-slate-800 p-4"
        >
          <p className="text-sm text-gray-400">
            Closed Tickets ID: {ticket.ID}
          </p>

          <p className="text-lg font-semibold">{ticket.Title}</p>

          <p className="text-white/80">{ticket.SolvedDescription}</p>

          <Link
            href={`/admin/documentation/${ticket.ID}`}
            className="mt-3 inline-block rounded-md border border-black bg-blue-900 p-2 text-center hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export const instant = false;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string | string[] }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const params = await searchParams;
  const search = typeof params.query === "string" ? params.query : "";

  return (
    <main className="min-h-screen bg-slate-900 p-4 text-white">
      <Navbar />
      <div className="ml-[260px] px-6 pb-10 pt-[77px] max-md:ml-[65px] max-md:px-4">
        <div className="relative mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Closed Tickets</h1>

          <Link
            href="/admin"
            className="rounded-md border border-black bg-blue-900 p-2 text-center"
          >
            Back to admin
          </Link>
        </div>

        <div className="mb-6 h-px w-full bg-blue-400/70" />

        <div className="mb-5">
          <Suspense fallback={<div className="h-12" />}>
            <SearchBar placeholder="Search closed tickets..." />
          </Suspense>
        </div>

        <Suspense
          key={search}
          fallback={<p className="text-white">Loading Closed Tickets...</p>}
        >
          <ClosedTicketsList search={search} />
        </Suspense>
      </div>
    </main>
  );
}
