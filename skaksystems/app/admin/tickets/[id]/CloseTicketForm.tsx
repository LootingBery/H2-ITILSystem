"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CloseTicketForm({ ticketId }: { ticketId: number }) {
  const [SolvedDescription, setSolvedDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch(`/api/tickets/${ticketId}/close`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SolvedDescription: SolvedDescription,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      return;
    }

    router.push("/admin/tickets");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="SolvedDescription">Problem Solved Description</label>
      <textarea
        id="SolvedDescription"
        value={SolvedDescription}
        onChange={(e) => setSolvedDescription(e.target.value)}
        placeholder="How did you solve the problem?"
        rows={6}
        required
        className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black"
      />

      {error && <p className="text-red-400 mt-2">{error}</p>}

      <button
        type="submit"
        className="mt-4 rounded bg-green-700 p-2 hover:bg-green-600"
      >
        Close Ticket
      </button>
    </form>
  );
}
