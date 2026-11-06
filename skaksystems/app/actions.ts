"use server";

import { query } from "@/app/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function createTicket(formData: FormData) {
  const Title = formData.get("Title");
  const Description = formData.get("Description");
  const Forename = formData.get("Forename");
  const Mail = formData.get("Mail");
  const Phone = formData.get("Phone");

  await query(
    "INSERT INTO Tickets (Title, Description, Forename, Mail, Phone) VALUES (?, ?, ?, ?, ?)",
    [Title, Description, Forename, Mail, Phone],
  );

  revalidatePath("/");
}
export async function createEmployee(formData: FormData) {
  const Forename = formData.get("Forename")?.toString();
  const Surname = formData.get("Surname")?.toString();
  const Level = formData.get("Level")?.toString();
  const Password = formData.get("Password")?.toString();

  if (!Forename || !Surname || !Level || !Password) {
    throw new Error("All employee fields are required");
  }

  const hashedPassword = await bcrypt.hash(Password, 10);

  await query(
    "INSERT INTO Employees (Forename, Surname, Level, Password) VALUES (?, ?, ?, ?)",
    [Forename, Surname, Level, hashedPassword],
  );

  revalidatePath("/admin/employees/add");
}
export async function createSLA(formData: FormData) {
  const Title = formData.get("Title")?.toString();
  const Description = formData.get("Description")?.toString();
  const Punishment = formData.get("Punishment")?.toString();
  const ExpirationDate = formData.get("ExpirationDate")?.toString();

  if (!Title || !Description || !Punishment || !ExpirationDate) {
    throw new Error("All SLA fields are required");
  }

  if (!Title) {
    throw new Error("Title is required");
  }
  if (!Description) {
    throw new Error("Description is required");
  }
  if (!Punishment) {
    throw new Error("Punishment is required");
  }
  if (!ExpirationDate) {
    throw new Error("Expiration date is required");
  }
  await query(
    "INSERT INTO SLA (Title, Description, Punishment, ExpirationDate) VALUES (?, ?, ?, ?)",
    [Title, Description, Punishment, ExpirationDate],
  );

  revalidatePath("/admin/sla/add");
}
