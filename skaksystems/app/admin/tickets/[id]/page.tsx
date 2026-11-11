import { query } from "@/app/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";
import { Suspense } from "react";
import ForwardTicketForm from "./ForwardTicketForm";
import ForwardTicketHistory from "./ForwardTicketHistory";
import TicketProblemSection from "./TicketProblemSection";

interface Ticket {
  ID: number;
  Title: string;
  Description: string;
  Forename: string;
  Mail: string;
  Phone: string;
  Priority: number;
  AssignedLevel: number;
}

interface Problem {
  ID: number;
  Title: string;
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
  const problems = await query<Problem[]>(
    "SELECT ID, Title FROM Problems ORDER BY Title",
  );

  const ticket = tickets[0];

  if (!ticket) {
    notFound();
  }
  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white scrollbar-none">
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

        <ForwardTicketForm
          ticketId={ticket.ID}
          assignedLevel={Number(ticket.AssignedLevel)}
        />

        <ForwardTicketHistory ticketId={ticket.ID} />
        <p>
          <span className="font-semibold text-blue-400">Forwarded level:</span>{" "}
          {ticket.AssignedLevel}
        </p>
        <TicketProblemSection
          ticketId={ticket.ID}
          priority={ticket.Priority}
          problems={problems}
        />
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
