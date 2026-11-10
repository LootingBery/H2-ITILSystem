import { pool, query } from "@/app/db";
import { Suspense } from "react";
import Link from "next/link";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import DeleteTicketButton from "./DeleteTicketButton";

interface Tickets {
  ID: number;
  Title: string;
  Description: string;
  Forename: string;
  Mail: string;
  Phone: string;
  Priority: number;
}
async function TicketsList() {
  const session = await getSession();
  let level = "";

  if (session) {
    const [rows] = await pool.execute(
      "SELECT Level FROM Employees WHERE ID = ?",
      [session.employeeId],
    );

    const employees = rows as { Level: string }[];

    level = employees[0]?.Level ?? "";
  }
  const tickets = await query<Tickets[]>(
    "SELECT * FROM Tickets WHERE Priority <= ? ORDER BY Priority DESC",
    [Number(level)],
  );
  const ticket = tickets[0];

  if (!ticket || tickets.length === 0) {
    return (
      <div className="text-center font-semibold text-5xl mt-20 text-white/80">
        No open tickets. Enjoy slacking!
      </div>
    );
  }
  return (
    <div className="grid gap-2">
      {tickets.map((ticket) => (
        <div
          key={ticket.ID}
          className="relative p-4 bg-slate-800 rounded border border-slate-700"
        >
          <p className="font-sm text-gray-400 text-sm">Ticket: {ticket.ID}</p>

          <p className="font-semibold text-lg">{ticket.Title}</p>

          <p>{ticket.Forename}</p>
          <p className="text-sm text-slate-400">{ticket.Mail}</p>
          <div className=" flex items-center justify-between">
            <Link
              href={`/admin/tickets/${ticket.ID}`}
              className="border border-black bg-blue-900 rounded-md p-2 hover:bg-blue-700 text-center hover:cursor-pointer"
            >
              View Ticket
            </Link>
            {Number(level) >= 3 && <DeleteTicketButton ticketId={ticket.ID} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export const instant = false;
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
          <div className="flex gap-2">
            <Link
              href="/admin/tickets/add"
              className="border border-black bg-blue-900 rounded-md p-2"
            >
              Add Ticket
            </Link>
            <Link
              href="/admin"
              className="border border-black bg-blue-900 rounded-md p-2"
            >
              Back to admin
            </Link>
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-blue-400/70" />

        <Suspense fallback={<p className="text-white">Loading tickets...</p>}>
          <TicketsList />
        </Suspense>
      </div>
    </main>
  );
}
