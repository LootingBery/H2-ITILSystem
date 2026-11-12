import { getSession } from "@/app/lib/session";
import { pool } from "@/app/db";
import UserDropdown from "./UserDropdown";

import {
  ChessQueen,
  ChessBishop,
  ChessKnight,
  ChessKing,
  ChessRook,
} from "lucide-react";

<meta name="viewport" content="width=device-width, initial-scale=1.0" />;

async function Navbar() {
  const session = await getSession();
  let forename = "";
  let surname = "";
  let level = "";

  if (session) {
    const [rows] = await pool.execute(
      "SELECT Forename, Surname, Level FROM Employees WHERE ID = ?",
      [session.employeeId],
    );

    const employees = rows as {
      Forename: string;
      Surname: string;
      Level: string;
    }[];

    forename = employees[0]?.Forename ?? "";
    surname = employees[0]?.Surname ?? "";
    level = employees[0]?.Level ?? "";
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[61px] items-center justify-between border border-[#30303a] bg-[#191a22] px-3">
      <div className="flex items-center gap-2.5">
        <a href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400">
            <ChessRook size={19} />
          </div>
          Skak Systems
        </a>
      </div>

      <UserDropdown forename={forename} surname={surname} level={level} />
      <aside className="fixed bottom-0 left-0 top-[61px] z-40 w-[260px] border-r border-[#252630] bg-[#191a22] px-2 py-3 max-md:w-[65px]">
        <p className="mb-3 px-1 text-[11px] text-[#9297aa] max-md:text-center">
          MENU
        </p>
        <nav className="space-y-2">
          <a
            href="/admin/documentation"
            className={`text-lg flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left  text-white max-md:justify-center`}
          >
            <ChessRook size={15} className="text-blue-400 " />
            Documentation
          </a>
          <a
            href="/admin/tickets"
            className={`text-lg flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-white max-md:justify-center`}
          >
            <ChessBishop size={15} className="text-blue-400" />
            Tickets
          </a>
          <a
            href="/admin/problems"
            className={`text-lg flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-white max-md:justify-center`}
          >
            <ChessKnight size={15} className="text-blue-400" />
            Problems
          </a>
          <a
            href="/admin/employees"
            className={`text-lg flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-white max-md:justify-center`}
          >
            <ChessKing size={15} className="text-blue-400" />
            Employees
          </a>
          <a
            href="/admin/sla"
            className={`text-lg flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-white max-md:justify-center`}
          >
            <ChessQueen size={20} className="shrink-0 text-blue-400" />
            SLA
          </a>
        </nav>
      </aside>
    </header>
  );
}

export default Navbar;
