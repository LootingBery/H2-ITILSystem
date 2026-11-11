"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Problem {
  ID: number;
  Title: string;
}

interface ClosedTicketProblemSectionProps {
  ticketId: number;
  problems: Problem[];
  initialProblemId: number | null;
}

export default function ClosedTicketProblemSection({
  ticketId,
  problems,
  initialProblemId,
}: ClosedTicketProblemSectionProps) {
  const [problemId, setProblemId] = useState<number | null>(initialProblemId);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  async function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    const nextProblemId = value ? Number(value) : null;
    setError("");
    setIsSaving(true);

    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId: nextProblemId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not update the problem");
      }

      setProblemId(nextProblemId);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not update the problem",
      );
    } finally {
      setIsSaving(false);
    }
  }

  const selectedProblem = problems.find((problem) => problem.ID === problemId);

  return (
    <div className="mt-4 rounded border border-slate-700 bg-slate-800 p-4">
      <label htmlFor="closed-ticket-problem" className="font-semibold">
        Problem:{" "}
      </label>
      <select
        id="closed-ticket-problem"
        value={problemId ?? ""}
        onChange={handleChange}
        disabled={isSaving || problems.length === 0}
        className="cursor-pointer rounded-lg border border-slate-600 bg-slate-700 px-5 py-2.5 text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="">
          {problems.length === 0 ? "No problems available" : "No problem"}
        </option>
        {problems.map((problem) => (
          <option key={problem.ID} value={problem.ID}>
            {problem.Title}
          </option>
        ))}
      </select>
      {selectedProblem && (
        <p className="mt-2 text-sm text-green-400">
          Added to problem: {selectedProblem.Title}
        </p>
      )}
      {error && <p className="mt-2 text-red-400">{error}</p>}
    </div>
  );
}
