"use server";

import { pool } from "@/app/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";

export async function updateSLA(formData: FormData) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const id = Number(formData.get("ID"));
  const title = String(formData.get("Title") ?? "").trim();
  const description = String(formData.get("Description") ?? "").trim();
  const expirationDate = String(formData.get("ExpirationDate") ?? "");
  const punishment = String(formData.get("Punishment") ?? "").trim();

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !title ||
    !description ||
    !expirationDate ||
    !punishment ||
    !/^\d{4}-\d{2}-\d{2}$/.test(expirationDate) ||
    Number.isNaN(Date.parse(expirationDate))
  ) {
    throw new Error("Invalid SLA data");
  }

  await pool.execute(
    `UPDATE SLA
    SET Title = ?,
    Description = ?,
    ExpirationDate = ?,
    Punishment = ?
    WHERE ID = ?`,
    [title, description, expirationDate, punishment, id],
  );

  revalidatePath("/admin/sla");
  revalidatePath(`/admin/sla/${id}`);

  redirect("/admin/sla");
}
