"use client";

import { useEffect, useState } from "react";
import { createSLA } from "@/app/actions";

export default function AddSLAForm() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );
  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();

    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

    setToday(localDate);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("Submitting...");
    setMessageType("success");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await createSLA(formData);

      setMessage("Service Level Agreement created successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting SLA:", error);
      setMessage("Error submitting SLA. Please try again later.");
      setMessageType("error");
    }
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center font-sans text-white">
      <div className="mb-4 flex w-full max-w-2xl items-center justify-between gap-4">
        <h1 className="text-right text-2xl font-bold">
          SLA | Service Level Agreement
        </h1>

        <a
          href="/admin/sla"
          className="rounded-md border border-black bg-blue-900 p-3 text-center hover:cursor-pointer"
        >
          Back to overview
        </a>
      </div>

      <div className="flex h-max w-full max-w-2xl flex-col rounded-md bg-gray-600/80">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 p-4"
        >
          <label htmlFor="Title" className="text-xl font-bold">
            Title:
            <input
              type="text"
              id="Title"
              name="Title"
              required
              className="mt-1 block w-full rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
            />
          </label>

          <label htmlFor="Description" className="mt-1 font-bold">
            Description:
            <textarea
              id="Description"
              name="Description"
              rows={6}
              className="mt-1 block w-full resize-y rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
            />
          </label>

          <label htmlFor="ExpirationDate" className="font-bold">
            Expiration date of the SLA:
            <input
              type="date"
              id="ExpirationDate"
              name="ExpirationDate"
              min={today}
              required
              className="mt-1 block w-full rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
            />
          </label>

          <label htmlFor="Punishment" className="font-bold text-red-300">
            Punishment if the SLA is not met:
            <input
              type="text"
              id="Punishment"
              name="Punishment"
              required
              className="mt-1 block w-full rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
            />
          </label>

          <div className="mt-2 flex flex-col items-center justify-center">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>

            {message && (
              <p
                role="status"
                className={`text-center font-bold ${
                  messageType === "success" ? "text-green-300" : "text-red-300"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
