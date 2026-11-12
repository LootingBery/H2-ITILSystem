import { query } from "@/app/db";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { pool } from "@/app/db";
import Navbar from "./navbar";

import {
  ChessRook,
  ChessBishop,
  ChessKnight,
  ChessKing,
  ChessQueen,
  TicketCheck,
  Ticket,
  SquarePen,
  User,
} from "lucide-react";

export const instant = false;
export default async function Page() {
  const session = await getSession();
  let level = "";

  if (session) {
    const [rows] = await pool.execute(
      "SELECT Level FROM Employees WHERE ID = ?",
      [session.employeeId],
    );

    const Level = rows as { Level: string }[];

    level = Level[0]?.Level ?? "";
  }

  if (!session) {
    redirect("/login");
  }

  const [ticketCount, closedTicketCount, employeeCount, slacount] =
    await Promise.all([
      query<{ total: number }[]>("SELECT COUNT(*) AS total FROM Tickets"),
      query<{ total: number }[]>("SELECT COUNT(*) AS total FROM ClosedTickets"),
      query<{ total: number }[]>("SELECT COUNT(*) AS total FROM Employees"),
      query<{ total: number }[]>("SELECT COUNT(*) AS total FROM SLA"),
    ]);

  const tickets = Number(ticketCount[0].total);
  const closedTickets = Number(closedTicketCount[0].total);
  const employees = Number(employeeCount[0].total);
  const slas = Number(slacount[0].total);

  return (
    <main className="min-h-screen bg-[#101116] text-white">
      <Navbar />
      <div className="ml-[260px] px-6 pb-10 pt-[77px] max-md:ml-[65px] max-md:px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-blue-400/70 " />

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div className="group rounded-2xl border border-[#30303a] bg-[#252735] p-5 shadow-lg shadow-black/10 ">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-md font-medium text-[#c5c8d4]">Tickets</p>
              </div>
              <div className="rounded-xl bg-blue-400/10 p-3 text-blue-400  ">
                <Ticket size={21} />
              </div>
            </div>
            <p className="text-3xl font-bold tracking-tight">{tickets}</p>
          </div>

          <div className="group rounded-2xl border border-[#30303a] bg-[#252735] p-5 shadow-lg shadow-black/10">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-md font-medium text-[#c5c8d4]">
                  Closed Tickets
                </p>
              </div>
              <div className="rounded-xl bg-emerald-400/10 p-3 ">
                <TicketCheck size={21} />
              </div>
            </div>
            <p className="text-3xl font-bold tracking-tight">{closedTickets}</p>
          </div>

          <div className="group rounded-2xl border border-[#30303a] bg-[#252735] p-5 shadow-lg shadow-black/10">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-md font-medium text-[#c5c8d4]">SLA active</p>
              </div>
              <div className="rounded-xl bg-amber-400/10 p-3 ">
                <SquarePen size={21} />
              </div>
            </div>
            <p className="text-3xl font-bold tracking-tight">{slas}</p>
          </div>

          <div className="group rounded-2xl border border-[#30303a] bg-[#252735] p-5 shadow-lg shadow-black/10 ">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-md font-medium text-[#c5c8d4]">Employees</p>
              </div>
              <div className="rounded-xl bg-blue-600/10 p-3 text-blue-500">
                <User size={21} />
              </div>
            </div>
            <p className="text-3xl font-bold tracking-tight">{employees}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

//"It needs to be perfect." - Benjamin
