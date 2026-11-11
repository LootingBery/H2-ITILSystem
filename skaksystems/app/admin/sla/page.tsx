import { pool, query } from "@/app/db";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

export const instant = false;

interface SLA {
  ID: number;
  Title: string;
  Description: string;
  ExpirationDate: string;
  Punishment: string;
}
async function GetSLA({ level }: { level: number }) {
  const SLAs = await query<SLA[]>("SELECT * FROM SLA");
  const SLA = SLAs[0];

  if (!SLA || SLAs.length === 0) {
    return (
      <div className="text-center font-semibold text-5xl mt-20 text-white/80">
        No Service Level Agreements. No one is agreeing with us. Go play WoW
        Forever.
      </div>
    );
  }
  return (
    <div className="grid gap-2">
      {SLAs.map((sla) => (
        <div
          key={sla.ID}
          className="p-4 bg-slate-800 rounded border border-slate-700"
        >
          <p className="font-sm text-gray-400 text-sm">SLA: {sla.ID}</p>
          <p className="font-semibold text-lg">{sla.Title}</p>
          <p className="text-sm text-white/80">{sla.Description}</p>
          <p className="text-sm text-white/80">Punishment: {sla.Punishment}</p>
          <Link
            href={`/admin/sla/${sla.ID}`}
            className="inline-block mt-3 border border-black bg-blue-900 rounded-md p-2 hover:bg-blue-700 text-center"
          >
            Edit SLA
          </Link>
        </div>
      ))}
    </div>
  );
}

export default async function page() {
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
  const levelNum = Number(level);
  if (levelNum < 3) {
    redirect("/admin");
  }

  if (!session) {
    redirect("/login");
  }
  return (
    <main>
      <div className="p-4 text-white bg-slate-900 min-h-screen">
        <div className=" relative mb-4 flex flex-row items-center">
          <h1 className="text-2xl font-bold">SLA | Service Level Agreement</h1>
          <div className="absolute right-0 flex gap-2">
            {Number(level) >= 3 && (
              <a
                href="/admin/sla/add"
                className="border border-black bg-blue-900 rounded-md p-2 hover:cursor-pointer text-center"
              >
                Add Service Level Agreement
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
        <Suspense
          fallback={
            <p className="text-white">Loading Service Level Agreements...</p>
          }
        >
          <GetSLA level={Number(level)} />
        </Suspense>
      </div>
    </main>
  );
}
