"use server";

import { pool } from "@/app/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";

export async function updateemployee(formData: FormData) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const [rows] = await pool.execute(
    "SELECT Level FROM Employees WHERE ID = ?",
    [session.employeeId],
  );

  const employees = rows as { Level: string }[];
  const currentLevel = Number(employees[0]?.Level ?? 0);

  if (currentLevel < 3) {
    throw new Error("You do not have permission to edit employees");
  }

  const id = Number(formData.get("ID"));
  const forename = String(formData.get("Forename") ?? "").trim();
  const surname = String(formData.get("Surname") ?? "").trim();
  const level = String(formData.get("Level") ?? "");

  if (
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    !forename ||
    !surname ||
    !["1", "2", "3"].includes(level)
  ) {
    throw new Error("Invalid employee data");
  }

  const [result] = await pool.execute(
    `UPDATE Employees
     SET Forename = ?,
         Surname = ?,
         Level = ?
     WHERE ID = ?`,
    [forename, surname, level, id],
  );

  revalidatePath("/admin/employees");
  revalidatePath(`/admin/employees/${id}`);

  redirect("/admin/employees");
}
