"use client";

import { useState } from "react";

interface PriorityDropdownProps {
  ticketId: number;
  priority: number;
}

export default function PriorityDropdown({
  ticketId,
  priority,
}: PriorityDropdownProps) {
  const [currentPriority, setCurrentPriority] = useState(priority);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newPriority = Number(e.target.value);

    setCurrentPriority(newPriority);

    try {
      const response = await fetch(`/api/tickets/${ticketId}/priority`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priority: newPriority,
        }),
      });

      if (!response.ok) {
        setCurrentPriority(priority);
        alert("Could not update priority");
      }
    } catch {
      setCurrentPriority(priority);
      alert("Something went wrong");
    }
  }

  return (
    <div>
      <select
        value={currentPriority}
        onChange={handleChange}
        aria-label="Change ticket priority"
        className="cursor-pointer rounded-lg border border-slate-600 bg-slate-700 px-5 py-2.5 text-white shadow-sm transition-all duration-200 hover:border-blue-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="1">Minimally</option>
        <option value="2">Important</option>
        <option value="3">Critical</option>
      </select>
    </div>
  );
}
