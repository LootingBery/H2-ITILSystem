"use client";

import { useState } from "react";
import { changePassword } from "./actions";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function ChangePasswordForm() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    setMessage("");

    try {
      const result = await changePassword(formData);

      if (result.error) {
        setIsError(true);
        setMessage(result.error);
      } else {
        setIsError(false);
        setMessage(result.success ?? "Password changed.");
        form.reset();
      }
    } catch {
      setIsError(true);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-2xl font-bold">Change Password</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-lg border border-slate-700 bg-slate-800 p-6"
        >
          {[
            ["currentPassword", "Current Password"],
            ["newPassword", "New Password"],
            ["confirmPassword", "Confirm New Password"],
          ].map(([name, label]) => (
            <label key={name} className="grid gap-2">
              {label}
              <input
                type={showPasswords ? "text" : "password"}
                name={name}
                autoComplete={
                  name === "currentPassword"
                    ? "current-password"
                    : "new-password"
                }
                required
                className="rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
              />
            </label>
          ))}

          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="flex items-center gap-2 self-start text-blue-300 hover:text-blue-200"
          >
            {showPasswords ? <EyeOff size={20} /> : <Eye size={20} />}
            {showPasswords ? "Hide Passwords" : "Show Passwords"}
          </button>

          <div className="flex justify-end gap-2">
            <Link
              href="/admin/employees"
              className="rounded-md bg-slate-600 px-5 py-3 hover:bg-slate-500"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="hover:cursor-pointer rounded-md bg-blue-700 px-6 py-3 font-semibold hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>

          {message && (
            <p
              role="status"
              className={`text-center font-semibold ${
                isError ? "text-red-300" : "text-green-300"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
