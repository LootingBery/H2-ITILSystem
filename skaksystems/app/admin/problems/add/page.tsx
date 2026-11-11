"use client";

import React, { useState } from "react";
import { createproblemlist } from "@/app/actions";
import Link from "next/dist/client/link";

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

      await createproblemlist(formData);

      setMessage("Problem list created successfully");
      form.reset();
    } catch (error) {
      console.error("Error created problem list:", error);
      setMessage("Error created problem list. Please try again later.");
      setMessageType("error");
    }
  }

  return (
    <main className="flex flex-col flex-1  font-sans text-white">
      <div className="p-4 text-white bg-slate-900 min-h-screen">
        <div className="mb-4 flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">Tickets</h1>
          <div className="flex gap-2">
            <Link
              href="/admin/problems"
              className="border border-black bg-blue-900 rounded-md p-2"
            >
              Back to Problems lists
            </Link>
            <Link
              href="/admin"
              className="border border-black bg-blue-900 rounded-md p-2"
            >
              Back to admin
            </Link>
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-blue-400/70" />
        <div className="justify-center flex flex-col mx-auto max-w-2xl w-full h-max rounded-md">
          <div className="justify-center flex flex-col bg-gray-800 max-w-2xl w-full h-max rounded-md">
            <div className="flex flex-col  max-w-2xl w-full h-max rounded-md"></div>
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
                  className="mt-1 block w-full resize-y rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
                />
              </label>

              <div className="flex justify-center items-center mt-2 flex-col">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
                {message && (
                  <p
                    className={`text-center font-bold ${
                      messageType === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
