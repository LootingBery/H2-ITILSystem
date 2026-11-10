import { query } from "@/app/db";
import ForwardTicketHistoryDropdown from "./ForwardTicketHistoryDropdown";

interface ForwardHistory {
  ID: number;
  ForwardedBy: string | null;
  ForwardedToLevel: number;
  Reason: string;
  ForwardedAt: Date | string;
}

export default async function ForwardTicketHistory({
  ticketId,
}: {
  ticketId: number;
}) {
  const history = await query<ForwardHistory[]>(
    `SELECT
      h.ID,
      CONCAT(e.Forename, ' ', e.Surname) AS ForwardedBy,
      h.ForwardedToLevel,
      h.Reason,
      h.ForwardedAt
    FROM TicketForwardHistory h
    LEFT JOIN Employees e ON h.ForwardedBy = e.ID
    WHERE h.TicketID = ?
    ORDER BY h.ForwardedAt DESC, h.ID DESC`,
    [ticketId],
  );

  const formattedHistory = history.map((item) => ({
    ...item,
    ForwardedAt: new Date(item.ForwardedAt).toLocaleString("da-DK", {
      dateStyle: "short",
      timeStyle: "short",
    }),
  }));

  return <ForwardTicketHistoryDropdown history={formattedHistory} />;
}
