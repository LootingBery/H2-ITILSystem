import { pool, query } from "@/app/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";
import { updateemployee } from "./actions";

export const instant = false;

interface Employee {
  ID: number;
  Forename: string;
  Surname: string;
  Level: string;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const [rows] = await pool.execute(
    "SELECT Level FROM Employees WHERE ID = ?",
    [session.employeeId],
  );

  const employees = rows as { Level: string }[];
  const level = Number(employees[0]?.Level ?? 0);

  if (level < 3) {
    redirect("/admin/employees");
  }

  const { id } = await params;

  if (!/^\d+$/.test(id) || Number(id) <= 0) {
    notFound();
  }

  const employeeRows = await query<Employee[]>(
    "SELECT ID, Forename, Surname, Level FROM Employees WHERE ID = ?",
    [id],
  );

  const employee = employeeRows[0];

  if (!employee) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-900 p-4 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Employee: {employee.ID}</h1>

        <Link
          href="/admin/employees"
          className="rounded-md bg-blue-900 p-2 hover:bg-blue-700"
        >
          Back to Employees
        </Link>
      </div>

      <div className="mb-6 h-px w-full bg-blue-400/70" />

      <form
        action={updateemployee}
        className="mx-auto grid max-w-3xl gap-5 rounded-lg border border-slate-700 bg-slate-800 p-6"
      >
        <input type="hidden" name="ID" value={employee.ID} />

        <label className="grid gap-2 font-semibold">
          Forename
          <input
            type="text"
            name="Forename"
            defaultValue={employee.Forename}
            required
            className="rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
          />
        </label>

        <label className="grid gap-2 font-semibold">
          Surname
          <input
            type="text"
            name="Surname"
            defaultValue={employee.Surname}
            required
            className="rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
          />
        </label>

        <label className="grid gap-2 font-semibold">
          Employee Level
          <select
            name="Level"
            defaultValue={employee.Level}
            required
            className="rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
          >
            <option value="1">Level 1 - Phone-junkies</option>
            <option value="2">Level 2 - Programmer/Cybersecurity</option>
            <option value="3">Level 3 - Boss</option>
          </select>
        </label>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/employees"
            className="rounded-md bg-slate-600 px-5 py-3 hover:bg-slate-500"
          >
            Cancel
          </Link>

          <Link
            href={`/admin/employees/${employee.ID}/change-password`}
            className="rounded-md bg-amber-700 px-5 py-3 hover:bg-amber-600"
          >
            Change Password
          </Link>

          <button
            type="submit"
            className="rounded-md bg-blue-700 px-6 py-3 font-semibold hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}
