import { query } from "@/app/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import CloseTicketForm from "./CloseTicketForm";
import { getSession } from "@/app/lib/session";

interface Ticket {
  ID: number;
  Title: string;
  Description: string;
  Forename: string;
  Mail: string;
  Phone: string;
  Priority: number;
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
      <TicketDetails params={params} />
    </Suspense>
  );
}

async function TicketDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const tickets = await query<Ticket[]>("SELECT * FROM Tickets WHERE ID = ?", [
    id,
  ]);

  const ticket = tickets[0];

  if (!ticket) {
    notFound();
  }
  let ticketpreority = "";
  if (ticket.Priority == 1) {
    ticketpreority = "Minimally";
  } else if (ticket.Priority == 2) {
    ticketpreority = "Important";
  } else if (ticket.Priority == 3) {
    ticketpreority = "Critical";
  }

  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Ticket: {ticket.ID}</h1>

      <div className="bg-slate-800 p-4 rounded border border-slate-700">
        <p>
          <strong className="text-blue-400">Title:</strong> {ticket.Title}
        </p>

        <p>
          <strong className="text-blue-400">Description:</strong>{" "}
          {ticket.Description}
        </p>

        <p>
          <strong className="text-blue-400">Name:</strong> {ticket.Forename}
        </p>

        <p>
          <strong className="text-blue-400">Email:</strong> {ticket.Mail}
        </p>

        <p>
          <strong className="text-blue-400">Phone:</strong> {ticket.Phone}
        </p>

        <br />

        <p>
          <strong className="text-blue-400">Priority:</strong> {ticketpreority}
        </p>
        <CloseTicketForm ticketId={ticket.ID} />
      </div>

      <Link
        href="/admin/tickets"
        className="inline-block mt-4 p-2 bg-blue-900 rounded"
      >
        Back to tickets
      </Link>
    </main>
  );
}
