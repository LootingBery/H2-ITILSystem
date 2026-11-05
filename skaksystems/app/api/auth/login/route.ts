import { pool } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

interface Employee {
  ID: number;
  Forename: string;
  Surname: string;
  Level: string;
  Password: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { forename, password } = body;

  if (!forename || !password) {
    return NextResponse.json(
      { error: "Please enter forename and password" },
      { status: 400 },
    );
  }

  const [rows] = await pool.execute(
    "SELECT * FROM Employees WHERE Forename = ?",
    [forename],
  );

  const employees = rows as Employee[];

  const employee = employees[0];

  if (!employee) {
    return NextResponse.json(
      { error: "Invalid forename or password" },
      { status: 401 },
    );
  }

  const passwordMatch = await bcrypt.compare(password, employee.Password);
  if (!passwordMatch) {
    return NextResponse.json(
      { error: "Invalid forename or password" },
      { status: 401 },
    );
  }
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is missing");
  }
  const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

  const token = await new SignJWT({
    employeeId: employee.ID,
    level: employee.Level,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);

  const response = NextResponse.json({
    message: "Login successful",
  });

  response.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 5,
  });

  return response;
}
