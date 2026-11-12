"use server";

import { query } from "@/app/db";
import { revalidatePath } from "next/cache";
import { z } from "zod"; // Email validation library
import bcrypt from "bcrypt";

const ticketSchema = z.object({
  Title: z.string().trim().min(1, "Title is required"),
  Description: z.string().trim().min(1, "Description is required"),
  Forename: z.string().trim().min(1, "Forename is required"),
  Mail: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  Phone: z.string().trim().optional(),
});

export async function createTicket(formData: FormData) {
  const validated = ticketSchema.safeParse({
    Title: formData.get("Title"),
    Description: formData.get("Description"),
    Forename: formData.get("Forename"),
    Mail: formData.get("Mail"),
    Phone: formData.get("Phone"),
  });

  if (!validated.success) {
    const firstError = validated.error.issues[0]?.message || "Invalid input";
    throw new Error(firstError);
  }

  const { Title, Description, Forename, Mail, Phone } = validated.data;

  try {
    await query(
      "INSERT INTO Tickets (Title, Description, Forename, Mail, Phone, Priority) VALUES (?, ?, ?, ?, ?, ?)",
      [Title, Description, Forename, Mail, Phone, 1],
    );

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Database error:", err);
    return {
      success: false,
      error: "Database error. Please try again later.",
    };
  }
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

export async function createproblemlist(formData: FormData) {
  const Title = formData.get("Title")?.toString();
  const Description = formData.get("Description")?.toString();
  if (!Title || !Description) {
    throw new Error("All problem list fields are required");
  }
  if (!Title) {
    throw new Error("Title is required");
  }
  if (!Description) {
    throw new Error("Description is required");
  }
  await query("INSERT INTO Problems (Title, Description) VALUES (?, ?)", [
    Title,
    Description,
  ]);
}
