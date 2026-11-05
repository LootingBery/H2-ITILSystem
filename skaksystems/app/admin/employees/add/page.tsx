import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import AddEmployeeForm from "./AddEmployeeForm";

export default async function AddEmployeePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <div className="p-4 text-white bg-slate-900 min-h-screen">
        <div className="mb-4 flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">Add Employee</h1>

          <a
            href="/admin/employees"
            className="border border-black bg-blue-900 rounded-md p-2"
          >
            Back to Employees
          </a>
        </div>

        <div className="mb-6 h-px w-full bg-blue-400/70" />

        <AddEmployeeForm />
      </div>
    </main>
  );
}
