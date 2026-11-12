"use client";

import React, { useState } from "react";
import { createTicket } from "@/app/actions";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Submitting...");
    setMessageType("success");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      console.log(formData);
      const result = await createTicket(formData);

      if (!result.success) {
        setMessage(result.error || "Validation failed.");
        setMessageType("error");
        return;
      }

      setMessage("Ticket submitted successfully!");
      setMessageType("success");
      form.reset();
    } catch (error) {
      console.error("Error submitting ticket:", error);
      setMessage("Unexpected error submitting ticket. Please try again later.");
      setMessageType("error");
    }
  }

  return (
    <main className="flex flex-col flex-1 items-center justify-center font-sans text-white">
      <div className="flex flex-col border-slate-700 bg-slate-800 max-w-2xl w-full h-max rounded-md">
        <form
          onSubmit={handleSubmit}
          className="justify-center flex flex-col gap-4 p-4"
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

          <label htmlFor="Description" className="text-md font-bold mt-1">
            Description:
            <textarea
              id="Description"
              name="Description"
              rows={6}
              required
              className="mt-1 block w-full resize-y rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
            />
          </label>

          <div className="flex flex-row gap-4">
            <label htmlFor="Forename" className="text-md font-bold flex-1">
              Name:
              <input
                type="text"
                id="Forename"
                name="Forename"
                required
                className="mt-1 block w-full rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
              />
            </label>
            <label htmlFor="Phone" className="text-md font-bold flex-1">
              Phone:
              <input
                type="number"
                id="Phone"
                name="Phone"
                maxLength={8}
                className="mt-1 block w-full rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
              />
            </label>
          </div>

          <label htmlFor="Mail" className="text-md font-bold">
            Mail:
            <input
              type="email"
              id="Mail"
              name="Mail"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              placeholder="your@email.com"
              className="mt-1 block w-full rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
              title="Please enter an email address with a domain extension (e.g., name@example.com)"
              required
            />
          </label>

          <div className="flex justify-center items-center mt-2 flex-col gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
            {message && (
              <p
                className={`text-center font-bold ${
                  messageType === "success" ? "text-green-500" : "text-red-500"
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
