import { pool } from "@/app/db";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import AddSLAForm from "./AddSLAForm";

export const instant = false;

export default async function Page() {
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

  return <AddSLAForm />;
}
