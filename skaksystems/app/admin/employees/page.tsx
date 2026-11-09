import { query } from "@/app/db";
import { Suspense } from "react";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { pool } from "@/app/db";
import DeleteEmployeeButton from "./DeleteEmployeeButton";
import Link from "next/link";

interface Employees {
  ID: number;
  Forename: string;
  Surname: string;
  Level: string;
  Password: string;
}

async function EmployeesList({
  level,
  currentEmployeeId,
}: {
  level: string;
  currentEmployeeId?: number;
}) {
  var employees = null;
  if (Number(level) <= 3) {
    employees = await query<Employees[]>(
      "SELECT * FROM Employees WHERE Level <= 3",
    );
  }
  if (Number(level) == 4) {
    employees = await query<Employees[]>("SELECT * FROM Employees");
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="text-center font-semibold text-5xl mt-20 text-white/80">
        No employees found. We're going bankrupt !
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {employees.map((employee) => (
        <div
          key={employee.ID}
          className="flex items-center justify-between gap-4 rounded border border-slate-700 bg-slate-800 p-4"
        >
          <div>
            <p className="text-sm text-gray-400">Employee ID: {employee.ID}</p>
            <p className="text-md">
              {employee.Forename} {employee.Surname}
            </p>
            <p className="text-md text-white">Level: {employee.Level}</p>
          </div>

          {Number(level) >= 3 && (
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/employees/${employee.ID}`}
                className="rounded-md border border-black bg-blue-900 p-2 text-center hover:bg-blue-700"
              >
                Edit Employee
              </Link>

              <DeleteEmployeeButton
                employeeId={employee.ID}
                isCurrentUser={employee.ID === currentEmployeeId}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

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
  return (
    <main>
      <div className="p-4 text-white bg-slate-900 min-h-screen">
        <div className=" relative mb-4 flex flex-row items-center">
          <h1 className="text-2xl font-bold">Employees</h1>
          <div className="absolute right-0 flex gap-2">
            {Number(level) >= 3 && (
              <a
                href="/admin/employees/add"
                className="border border-black bg-blue-900 rounded-md p-2 hover:cursor-pointer text-center"
              >
                Add Employee
              </a>
            )}
            <a
              href="/admin"
              className="border border-black bg-blue-900 rounded-md p-2 hover:cursor-pointer text-center"
            >
              Back to admin
            </a>
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-blue-400/70" />

        <Suspense fallback={<p className="text-white">Loading employees...</p>}>
          <EmployeesList
            level={level}
            currentEmployeeId={session?.employeeId}
          />
        </Suspense>
      </div>
    </main>
  );
}
