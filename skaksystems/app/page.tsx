import { query } from "@/app/db";
import { revalidatePath } from "next/cache";

export default function Home() {
  async function createTicket(formData: FormData) {
    "use server";

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

  return (
    <main className="flex flex-col flex-1 items-center justify-center font-sans text-white">
      <div className="flex flex-col bg-gray-600/80 max-w-2xl w-full h-max rounded-md">
        <form
          action={createTicket}
          className="justify-center flex flex-col gap-4 p-4"
        >
          <label htmlFor="Title" className="text-xl font-bold">
            Title:
            <input
              type="text"
              id="  "
              name="Title"
              required
              className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
            />
          </label>

          <label htmlFor="Description" className="text-md font-bold mt-1">
            Description:
            <textarea
              id="Description"
              name="Description"
              rows={6}
              className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
            />
          </label>
          <div className="flex flex-row gap-45">
            <label htmlFor="Forname" className="text-xl font-bold">
              Name:
              <input
                type="text"
                id="Forname"
                name="Forname"
                required
                className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
              />
            </label>
            <label htmlFor="Phone" className="text-xl font-bold">
              Phone:
              <input
                type="text"
                id="Phone"
                name="Phone"
                className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
              />
            </label>
          </div>
          <label htmlFor="Mail" className="text-xl font-bold">
            Mail:
            <input
              type="text"
              id="Mail"
              name="Mail"
              required
              className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
            />
          </label>

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
    </main>
  );
}
