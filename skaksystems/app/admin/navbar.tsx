import { ChessRook } from "lucide-react";
import { getSession } from "@/app/lib/session";
import { pool } from "@/app/db";
import UserDropdown from "./UserDropdown";

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
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400">
          <ChessRook size={19} />
        </div>

        <span className="text-[15px] font-extrabold">Skak Systems</span>
      </div>

      <UserDropdown forename={forename} surname={surname} level={level} />
    </header>
  );
}

export default Navbar;
