"use client";

interface Problem {
  ID: number;
  Title: string;
}

interface ProblemDropdownProps {
  problems: Problem[];
  value: number | null;
  onChange: (problemId: number | null) => void;
}

export default function ProblemDropdown({
  problems,
  value,
  onChange,
}: ProblemDropdownProps) {
  return (
    <select
      value={value ?? ""}
      onChange={(event) => {
        const selectedProblemId = event.target.value;
        onChange(selectedProblemId ? Number(selectedProblemId) : null);
      }}
      aria-label="Select a problem"
      disabled={problems.length === 0}
      className="cursor-pointer rounded-lg border border-slate-600 bg-slate-700 px-5 py-2.5 text-white shadow-sm transition-all duration-200 hover:border-blue-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <option value="">
        {problems.length === 0 ? "No problems available" : "Select a problem"}
      </option>
      {problems.map((problem) => (
        <option key={problem.ID} value={problem.ID}>
          {problem.Title}
        </option>
      ))}
    </select>
  );
}
