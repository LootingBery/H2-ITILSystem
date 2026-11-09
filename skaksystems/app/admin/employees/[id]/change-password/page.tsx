import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import ChangePasswordForm from "./ChangePasswordForm";

export const instant = false;

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <ChangePasswordForm />;
}
