import { query } from "@/app/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Ticket {
  ID: number;
  Title: string;
  Description: string;
  Forename: string;
  Mail: string;
  Phone: string;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tickets = await query<Ticket[]>("SELECT * FROM Tickets WHERE ID = ?", [
    id,
  ]);

  const ticket = tickets[0];

  if (!ticket) {
    notFound();
  }

  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Ticket #{ticket.ID}</h1>

      <div className="bg-slate-800 p-4 rounded border border-slate-700">
        <p>
          <strong>Title:</strong> {ticket.Title}
        </p>
        <p>
          <strong>Description:</strong> {ticket.Description}
        </p>
        <p>
          <strong>Name:</strong> {ticket.Forename}
        </p>
        <p>
          <strong>Email:</strong> {ticket.Mail}
        </p>
        <p>
          <strong>Phone:</strong> {ticket.Phone}
        </p>
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
