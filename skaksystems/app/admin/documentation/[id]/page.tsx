import { query } from "@/app/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";

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
          <p>Loading ticket...</p>
        </main>
      }
    >
      <ClosedTicketDetails params={params} />
    </Suspense>
  );
}

async function ClosedTicketDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const closedTickets = await query<ClosedTickets[]>(
    `SELECT
    ClosedTickets.*,
    Employees.Forename AS ClosedByForename,
    Employees.Surname AS ClosedBySurname
    FROM ClosedTickets
    LEFT JOIN Employees
    ON ClosedTickets.ClosedBy = Employees.ID
    WHERE ClosedTickets.ID = ?`,
    [id],
  );
  const closedTicket = closedTickets[0];

  if (!closedTicket) {
    notFound();
  }

  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Ticket #{closedTicket.ID}</h1>
        <Link href="/admin/documentation" className="p-2 bg-blue-900 rounded">
          Back to closed tickets
        </Link>
      </div>
      <div className="bg-slate-800 p-4 rounded border border-slate-700">
        <p>
          <strong className="text-blue-400">Title:</strong> {closedTicket.Title}
        </p>

        <p>
          <strong className="text-blue-400">Description:</strong>{" "}
          {closedTicket.Description}
        </p>

        <p>
          <strong className="text-blue-400">Customer name:</strong>{" "}
          {closedTicket.Forename}
        </p>

        <p>
          <strong className="text-blue-400">Email:</strong> {closedTicket.Mail}
        </p>

        <p>
          <strong className="text-blue-400">Phone:</strong> {closedTicket.Phone}
        </p>

        <br />
      </div>
      <div className="bg-slate-800 p-4 rounded border border-slate-700 mt-4">
        <p>
          <strong className="text-blue-400">Solved Description:</strong>{" "}
          {closedTicket.SolvedDescription}
        </p>
        <p>
          <strong className="text-blue-400">Closed Date:</strong>{" "}
          {new Date(closedTicket.ClosedAt).toLocaleString("da-DK", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>
          <strong className="text-blue-400">Closed by:</strong>{" "}
          {closedTicket.ClosedByForename} {closedTicket.ClosedBySurname}
        </p>
      </div>
    </main>
  );
}
