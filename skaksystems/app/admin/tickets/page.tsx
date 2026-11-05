import { query } from "@/app/db";
import { Suspense } from "react";
import Link from "next/link";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

interface Tickets {
  ID: number;
  Title: string;
  Description: string;
  Forename: string;
  Mail: string;
  Phone: string;
}

async function TicketsList() {
  const tickets = await query<Tickets[]>("SELECT * FROM Tickets");
  const ticket = tickets[0];

  return (
    <div className="grid gap-2">
      {tickets.map((ticket) => (
        <div
          key={ticket.ID}
          className="p-4 bg-slate-800 rounded border border-slate-700"
        >
          <p className="font-semibold text-lg">Ticket #{ticket.ID}</p>

          <p className="font-semibold text-lg">{ticket.Title}</p>

          <p>{ticket.Forename}</p>
          <p className="text-sm text-slate-400">{ticket.Mail}</p>

          <Link
            href={`/admin/tickets/${ticket.ID}`}
            className="inline-block mt-3 border border-black bg-blue-900 rounded-md p-2 hover:bg-blue-700 text-center"
          >
            View Ticket
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
        <div className="mb-4 flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">Tickets</h1>

          <Link
            href="/admin"
            className="border border-black bg-blue-900 rounded-md p-2"
          >
            Back to admin
          </Link>
        </div>

        <div className="mb-6 h-px w-full bg-blue-400/70" />

        <Suspense fallback={<p className="text-white">Loading tickets...</p>}>
          <TicketsList />
        </Suspense>
      </div>
    </main>
  );
}
