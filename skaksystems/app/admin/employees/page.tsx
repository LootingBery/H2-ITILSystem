import { query } from "@/app/db";
import { Suspense } from "react";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

interface Employees {
  ID: number;
  Forename: string;
  Surname: string;
  Level: string;
  Password: string;
}

async function EmployeesList() {
  const employees = await query<Employees[]>("SELECT * FROM Employees");

  if (!employees || employees.length === 0) {
    return (
      <div className="text-center font-semibold text-5xl mt-20 text-white/80">
        No employees found. We're going bankrupt!
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {employees.map((employee) => (
        <div
          key={employee.ID}
          className="p-4 bg-slate-800 rounded border border-slate-700"
        >
          <p className="font-semibold text-lg">Employee ID: {employee.ID}</p>

          <p className="text-md">
            {employee.Forename} {employee.Surname}
          </p>

          <p className="text-sm text-slate-400">Level: {employee.Level}</p>
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
        <div className=" relative mb-4 flex flex-row items-center">
          <h1 className="text-2xl font-bold">Employees</h1>
          <div className="absolute right-0 flex gap-2">
            <a
              href="/admin/employees/add"
              className="border border-black bg-blue-900 rounded-md p-2 hover:cursor-pointer text-center"
            >
              Add Employee
            </a>
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
          <EmployeesList />
        </Suspense>
      </div>
    </main>
  );
}
