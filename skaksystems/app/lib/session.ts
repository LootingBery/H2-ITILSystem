import { jwtVerify } from "jose";
import { cookies } from "next/headers";

interface EmployeeSession {
  employeeId: number;
  level: string;
}

export async function getSession(): Promise<EmployeeSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is missing");
  }

  const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

  try {
    const { payload } = await jwtVerify(token, secret);

    return {
      employeeId: payload.employeeId as number,
      level: payload.level as string,
    };
  } catch {
    return null;
  }
}
