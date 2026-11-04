import { query } from "@/app/db";

interface Tickets {
  ID: number;
  Title: string;
  Description: string;
  Forname: string;
  Mail: string;
  Phone: string;
}

export default async function Page() {
  const Tickets = await query<Tickets[]>("SELECT * FROM Tickets");

  return (
    <div className="p-4 text-white bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>

      <div className="grid gap-2">
        {Tickets.map((Ticket) => (
          <div
            key={Ticket.ID}
            className="p-4 bg-slate-800 rounded border border-slate-700"
          >
            <p className="font-semibold text-lg">{Ticket.Title}</p>
            <p className="text-md">{Ticket.Description}</p>
            <p className="text-sm text-slate-400">{Ticket.Forname}</p>
            <p className="text-sm text-slate-400">{Ticket.Mail}</p>
            <p className="text-sm text-slate-400"> {Ticket.Phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
