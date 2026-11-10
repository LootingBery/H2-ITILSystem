"use client";

import { useState } from "react";
import { Send, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface ForwardTicketFormProps {
  ticketId: number;
  assignedLevel: number;
}

export default function ForwardTicketForm({
  ticketId,
  assignedLevel,
}: ForwardTicketFormProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [level, setLevel] = useState(String(assignedLevel));
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/tickets/${ticketId}/forward`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: Number(level),
          reason: reason.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to forward ticket");
      }

      setIsError(false);
      setMessage("Ticket forwarded successfully");
      setReason("");
      setIsOpen(false);

      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error ? error.message : "Error: Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="forward-ticket-content"
        className="flex w-full cursor-pointer items-center justify-between p-4 text-left transition-colors hover:bg-slate-700/50"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <Send size={19} className="text-blue-400" />
          </div>

          <div>
            <h2 className="font-semibold text-white">Forward Ticket</h2>
            <p className="text-sm text-slate-400">
              Forward this ticket to another level
            </p>
          </div>
        </div>

        {isOpen ? (
          <ChevronUp size={20} className="text-slate-400" />
        ) : (
          <ChevronDown size={20} className="text-slate-400" />
        )}
      </button>

      {isOpen && (
        <form
          id="forward-ticket-content"
          onSubmit={handleSubmit}
          className="grid gap-4 border-t border-slate-700 p-4"
        >
          <label className="grid gap-2 text-sm font-medium">
            Forward to Level
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
              className="rounded-lg border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-blue-400"
            >
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Reason for Forwarding
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why does this ticket need to be forwarded?"
              required
              maxLength={2000}
              rows={3}
              className="resize-y rounded-lg border border-slate-600 bg-slate-700 p-3 text-white outline-none placeholder:text-slate-400 focus:border-blue-400"
            />
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading || Number(level) === assignedLevel || !reason.trim()
              }
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={16} />
              {loading ? "Forwarding..." : "Forward Ticket"}
            </button>
          </div>
        </form>
      )}

      {message && (
        <p
          role="status"
          className={`border-t border-slate-700 px-4 py-3 text-sm ${
            isError ? "text-red-300" : "text-green-300"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
