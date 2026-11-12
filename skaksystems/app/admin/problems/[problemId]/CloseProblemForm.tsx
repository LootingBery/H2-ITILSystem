"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CloseProblemForm({
  problemId,
  solvedDescription,
}: {
  problemId: number;
  solvedDescription?: string | null;
}) {
  const [SolvedDescription, setSolvedDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/api/problems/${problemId}/close`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SolvedDescription: SolvedDescription.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not close problem");
        return;
      }

      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (solvedDescription?.trim()) {
    return (
      <p>
        <strong className="text-blue-400">Solved Description:</strong>{" "}
        {solvedDescription}
      </p>
    );
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
        className="mt-1 block w-full resize-y rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
      />

      {error && <p className="mt-2 text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 cursor-pointer rounded bg-green-700 p-2 hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Closing..." : "Close Problem"}
      </button>
    </form>
  );
}
