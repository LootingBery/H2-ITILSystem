"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProblemSolvedDescription({
  problemId,
  solvedDescription,
}: {
  problemId: number;
  solvedDescription?: string | null;
}) {
  const [SolvedDescription, setSolvedDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  }

  return (
    <main>
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-block p-2 bg-blue-900 hover:bg-blue-700 rounded hover:cursor-pointer"
        >
          Edit Problem Solved Description
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {isOpen && (
          <>
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
              {loading ? "Updating..." : "Update Problem"}
            </button>
          </>
        )}
      </form>
    </main>
  );
}
