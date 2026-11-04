import { query } from "@/app/db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

function page() {
  async function createemployee(formData: FormData) {
    "use server";

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

    revalidatePath("/admin/employees");
  }

  return (
    <main>
      <div className="p-4 text-white bg-slate-900 min-h-screen">
        <div className="mb-4 flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">Employees</h1>
          <a
            href="/admin/employees"
            className="border border-black bg-blue-900 rounded-md p-2 hover:cursor-pointer text-center"
          >
            Back to Employees
          </a>
        </div>
        <div className="mb-6 h-px w-full bg-blue-400/70 " />
        <div className="flex flex-col flex-1 items-center justify-center font-sans text-white">
          <div className="flex flex-col bg-gray-600/80 max-w-2xl w-full h-max rounded-md">
            <form
              action={createemployee}
              className="justify-center flex flex-col gap-4 p-4"
            >
              <label htmlFor="Forename" className="text-xl font-bold">
                Forename:
                <input
                  type="text"
                  id="Forename"
                  name="Forename"
                  required
                  className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
                />
              </label>

              <label htmlFor="Surname" className="text-xl font-bold">
                Surname:
                <input
                  type="text"
                  id="Surname"
                  name="Surname"
                  required
                  className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
                />
              </label>

              <div className="flex flex-row gap-45">
                <label htmlFor="Password" className="text-xl font-bold">
                  Password:
                  <input
                    type="password"
                    id="Password"
                    name="Password"
                    required
                    className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
                  />
                </label>
                <label htmlFor="Level" className="text-xl font-bold">
                  Level:
                  <input
                    type="text"
                    id="Level"
                    name="Level"
                    required
                    className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
                  />
                </label>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
