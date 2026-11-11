"use client";

import { useState } from "react";
import CloseTicketForm from "./CloseTicketForm";
import PriorityDropdown from "./PriorityDropdown";
import ProblemDropdown from "./ProplemDropdown";

interface Problem {
  ID: number;
  Title: string;
}

interface TicketProblemSectionProps {
  ticketId: number;
  priority: number;
  problems: Problem[];
}

export default function TicketProblemSection({
  ticketId,
  priority,
  problems,
}: TicketProblemSectionProps) {
  const [problemID, setProblemId] = useState<number | null>(null);
  const selectedProblem = problems.find((problem) => problem.ID === problemID);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p>
          <span className="font-semibold text-blue-400">Problem:</span>{" "}
          {selectedProblem?.Title ?? "None"}
          <br />
          <span className="font-semibold text-blue-400">Priority:</span>{" "}
          {priority === 1
            ? "Minimally"
            : priority === 2
              ? "Important"
              : priority === 3
                ? "Critical"
                : ""}
        </p>
        <div className="flex items-center gap-2">
          <ProblemDropdown
            problems={problems}
            value={problemID}
            onChange={setProblemId}
          />
          <PriorityDropdown ticketId={ticketId} priority={priority} />
        </div>
      </div>

      <CloseTicketForm ticketId={ticketId} problemId={problemID} />
    </>
  );
}
