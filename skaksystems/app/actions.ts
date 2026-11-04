"use server";

import { query } from "@/app/db";
import { revalidatePath } from "next/cache";

export async function createTicket(formData: FormData) {
  const Title = formData.get("Title");
  const Description = formData.get("Description");
  const Forname = formData.get("Forname");
  const Mail = formData.get("Mail");
  const Phone = formData.get("Phone");

  await query(
    "INSERT INTO Tickets (Title, Description, Forname, Mail, Phone) VALUES (?, ?, ?, ?, ?)",
    [Title, Description, Forname, Mail, Phone],
  );

  revalidatePath("/");
}
