"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteEmployeeButtonProps {
  employeeId: number;
  isCurrentUser: boolean;
}

export default function DeleteEmployeeButton({
  employeeId,
  isCurrentUser,
}: DeleteEmployeeButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (isCurrentUser) {
      window.alert("You cannot delete your own account.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Could not delete employee");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting employee:", error);
      window.alert(
        error instanceof Error ? error.message : "Could not delete employee",
      );
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting || isCurrentUser}
      className="shrink-0 rounded-md border border-red-950 bg-red-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isCurrentUser
        ? "Cannot delete yourself"
        : isDeleting
          ? "Deleting..."
          : "Delete Employee"}
    </button>
  );
}
