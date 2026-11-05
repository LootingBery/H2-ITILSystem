import { query } from "@/app/db";
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

async function ClosedTicketsList() {
  const closedTickets = await query<ClosedTickets[]>(
    "SELECT * FROM ClosedTickets",
  );

  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Ticket #{closedTickets[0].ID}</h1>

      <div className="bg-slate-800 p-4 rounded border border-slate-700">
        <p>
          <strong>Title:</strong> {closedTickets[0].Title}
        </p>

        <p>
          <strong>Description:</strong> {closedTickets[0].Description}
        </p>

        <p>
          <strong>Name:</strong> {closedTickets[0].Forename}
        </p>

        <p>
          <strong>Email:</strong> {closedTickets[0].Mail}
        </p>

        <p>
          <strong>Phone:</strong> {closedTickets[0].Phone}
        </p>

        <br />
      </div>
      <div className="bg-slate-800 p-4 rounded border border-slate-700 mt-4">
        {" "}
        <strong>Solved Description:</strong>{" "}
        {closedTickets[0].SolvedDescription}
        <br />
        <strong>Closed Date:</strong> {closedTickets[0].ClosedDate}
        <br />
        <strong>Closed by:</strong> {closedTickets[0].ClosedBy}{" "}
      </div>
    </main>
  );
}
export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  return <main>page</main>;
}
