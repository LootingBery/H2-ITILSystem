import { pool, query } from "@/app/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";
import { updateSLA } from "./actions";

export const instant = false;

interface SLA {
  ID: number;
  Title: string;
  Description: string;
  ExpirationDate: Date | string;
  Punishment: string;
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
    redirect("/admin/sla");
  }

  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const SLAs = await query<SLA[]>("SELECT * FROM SLA WHERE ID = ?", [id]);

  const sla = SLAs[0];

  if (!sla) {
    notFound();
  }

  const expirationDate =
    sla.ExpirationDate instanceof Date
      ? sla.ExpirationDate.toISOString().slice(0, 10)
      : String(sla.ExpirationDate).slice(0, 10);

  return (
    <main className="min-h-screen bg-slate-900 p-4 text-white">
      <div className="relative mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit SLA: {sla.ID}</h1>
      </div>

      <div className="mb-6 h-px w-full bg-blue-400/70" />

      <form
        action={updateSLA}
        className="mx-auto grid max-w-3xl gap-5 rounded-lg border border-slate-700 bg-slate-800 p-6"
      >
        <input type="hidden" name="ID" value={sla.ID} />

        <label className="grid gap-2 font-semibold">
          Title
          <input
            type="text"
            name="Title"
            defaultValue={sla.Title}
            required
            className="rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
          />
        </label>

        <label className="grid gap-2 font-semibold">
          Description
          <textarea
            name="Description"
            defaultValue={sla.Description}
            required
            rows={5}
            className="resize-y rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
          />
        </label>

        <label className="grid gap-2 font-semibold">
          Expiration Date
          <input
            type="date"
            name="ExpirationDate"
            defaultValue={expirationDate}
            required
            className="rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
          />
        </label>

        <label className="grid gap-2 font-semibold">
          Punishment
          <textarea
            name="Punishment"
            defaultValue={sla.Punishment}
            required
            rows={3}
            className="resize-y rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
          />
        </label>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/sla"
            className="rounded-md bg-slate-600 px-5 py-3 hover:bg-slate-500"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-md bg-blue-700 px-6 py-3 font-semibold hover:bg-blue-600 hover:cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}
