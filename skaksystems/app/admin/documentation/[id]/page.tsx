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
    <div className="grid gap-2">
      {closedTickets.map((closedTickets) => (
        <div key={closedTickets.ID}>{closedTickets.Title}</div>
        <p >{closedTickets.Description}</p>
      ))}
    </div>
  );
}
export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  return <main>page</main>;
}
