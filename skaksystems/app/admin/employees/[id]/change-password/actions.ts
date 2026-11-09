"use server";

import { pool } from "@/app/db";
import { getSession } from "@/app/lib/session";
import bcrypt from "bcrypt";
import type { RowDataPacket } from "mysql2";

interface Employee extends RowDataPacket {
  ID: number;
  Password: string;
}

export async function changePassword(formData: FormData) {
  const session = await getSession();

  if (!session) {
    return { error: "You must be logged in." };
  }

  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (
    typeof currentPassword !== "string" ||
    typeof newPassword !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return { error: "Invalid password data." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match." };
  }

  const [rows] = await pool.execute<Employee[]>(
    "SELECT ID, Password FROM Employees WHERE ID = ?",
    [session.employeeId],
  );

  const employee = rows[0];

  if (!employee) {
    return { error: "Employee not found." };
  }

  const isValid = await bcrypt.compare(currentPassword, employee.Password);

  if (!isValid) {
    return { error: "Current password is incorrect." };
  }

  if (currentPassword === newPassword) {
    return { error: "New password must be different." };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await pool.execute("UPDATE Employees SET Password = ? WHERE ID = ?", [
    hashedPassword,
    employee.ID,
  ]);

  return { success: "Password changed successfully!" };
}
