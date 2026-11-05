import { query } from "@/app/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

interface ClosedTickets {
  ID: number;
  Title: string;
  Description: string;
  Forename: string;
  Surname: string;
  Mail: string;
  Phone: string;
  ClosedBy: string;
  SolvedDescription: string;
  ClosedDate: string;
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
    "SELECT * FROM ClosedTickets WHERE ID = ?",
    [id],
  );

  const closedTicket = closedTickets[0];

  if (!closedTicket) {
    notFound();
  }

  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Ticket #{closedTicket.ID}</h1>

      <div className="bg-slate-800 p-4 rounded border border-slate-700">
        <p>
          <strong>Title:</strong> {closedTicket.Title}
        </p>

        <p>
          <strong>Description:</strong> {closedTicket.Description}
        </p>

        <p>
          <strong>Name:</strong> {closedTicket.Forename}
        </p>

        <p>
          <strong>Email:</strong> {closedTicket.Mail}
        </p>

        <p>
          <strong>Phone:</strong> {closedTicket.Phone}
        </p>

        <br />
      </div>
      <div className="bg-slate-800 p-4 rounded border border-slate-700 mt-4">
        {" "}
        <strong>Solved Description:</strong> {closedTicket.SolvedDescription}
        <br />
        <strong>Closed Date:</strong> {closedTicket.ClosedDate}
        <br />
        <strong>Closed by:</strong> {closedTicket.ClosedBy}{" "}
      </div>
    </main>
  );
}
