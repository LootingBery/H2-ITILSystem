"use client";

import { createEmployee } from "@/app/actions";
import Link from "next/dist/client/link";
import { useState } from "react";

export default function AddEmployeeForm() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      await createEmployee(formData);

      setMessage("Employee created successfully!");
      setMessageType("success");
      form.reset();
    } catch (error) {
      console.error("Error creating employee:", error);
      setMessage("Error creating employee. Please try again later.");
      setMessageType("error");
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans text-white">
      <div className="flex flex-col bg-gray-800 max-w-2xl w-full h-max rounded-md">
        <form
          onSubmit={handleSubmit}
          className="justify-center flex flex-col gap-4 p-4"
        >
          <label htmlFor="Forename" className="text-xl font-bold">
            Forename:
            <input
              type="text"
              id="Forename"
              name="Forename"
              required
              className="mt-1 block w-full rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
            />
          </label>

          <label htmlFor="Surname" className="text-xl font-bold">
            Surname:
            <input
              type="text"
              id="Surname"
              name="Surname"
              required
              className="mt-1 block w-full rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
            />
          </label>

          <div className="flex flex-row gap-30">
            <label htmlFor="Password" className="text-xl font-bold">
              Password:
              <input
                type="password"
                id="Password"
                name="Password"
                required
                className="mt-1 block w-full rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
              />
            </label>

            <label htmlFor="Level" className="text-xl font-bold">
              Level:
              <select
                id="Level"
                name="Level"
                required
                className="mt-1 block w-full rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
              >
                <option value="">Select level</option>
                <option value="1">Level 1 - Phone-junkies</option>
                <option value="2">Level 2 - Programmer/Cybersecurity</option>
                <option value="3">Level 3 - Boss</option>
              </select>
            </label>
          </div>
          <div className="flex justify-end gap-3">
            <Link
              href="/admin/employees"
              className="rounded-md bg-slate-600 px-5 py-3 hover:bg-slate-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-blue-700 px-6 py-3 font-semibold hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>

          {message && (
            <div
              className={`text-sm text-center ${
                messageType === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
