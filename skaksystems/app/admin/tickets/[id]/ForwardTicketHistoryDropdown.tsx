"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, History } from "lucide-react";

interface ForwardHistory {
  ID: number;
  ForwardedBy: string | null;
  ForwardedToLevel: number;
  Reason: string;
  ForwardedAt: string;
}

export default function ForwardTicketHistoryDropdown({
  history,
}: {
  history: ForwardHistory[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="forward-history-content"
        className="flex w-full cursor-pointer items-center justify-between p-4 text-left transition-colors hover:bg-slate-700/50"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <History size={19} className="text-blue-400" />
          </div>

          <div>
            <h2 className="font-semibold text-white">Forwarding History</h2>
          </div>
        </div>

        {isOpen ? (
          <ChevronUp size={20} className="text-slate-400" />
        ) : (
          <ChevronDown size={20} className="text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div
          id="forward-history-content"
          className="border-t border-slate-700 p-4"
        >
          {history.length === 0 ? (
            <p className="rounded-lg bg-slate-900 p-4 text-sm text-slate-400">
              This ticket has not been forwarded yet
            </p>
          ) : (
            <div className="grid gap-3">
              {history.map((item) => (
                <div
                  key={item.ID}
                  className="rounded-lg border border-slate-700 bg-slate-900 p-4"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-white">
                      {item.ForwardedBy ?? "Unknown employee"}
                    </p>

                    <span className="rounded-md bg-blue-900 px-3 py-1 text-xs font-medium text-blue-200">
                      Level {item.ForwardedToLevel}
                    </span>
                  </div>

                  <p className="mb-3 text-xs text-slate-400">
                    {item.ForwardedAt}
                  </p>

                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                    {item.Reason}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
