"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteProblemButton({
  problemId,
}: {
  problemId: number;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this List?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/problems/${problemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Could not delete ticket");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting ticket:", error);
      window.alert(
        error instanceof Error ? error.message : "Could not delete ticket",
      );
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="relative border border-black bg-red-900 rounded-md p-2 hover:bg-red-700 text-center hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete Ticket"}
    </button>
  );
}
