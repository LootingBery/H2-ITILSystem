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
    <select
      name="Priority"
      value={currentPriority}
      onChange={handleChange}
      className="rounded-md border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
    >
      <option value={1}>Minimally</option>
      <option value={2}>Important</option>
      <option value={3}>Critical</option>
    </select>
  );
}
