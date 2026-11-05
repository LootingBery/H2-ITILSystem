"use client";

import { useState } from "react";
import { User } from "lucide-react";

interface UserDropdownProps {
  forename: string;
  level: string;
}

export default function UserDropdown({ forename, level }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center hover:cursor-pointer gap-2 rounded-lg border border-[#30303a] px-2 py-1"
      >
        <User className="text-blue-400" size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-48 rounded-lg border border-[#30303a] bg-[#191a22] p-3 shadow-lg">
          <p className="block w-full rounded-md p-2 text-left font-bold">
            Bruger menu
          </p>

          <div className="mb-2 border-t border-[#30303a]"></div>
          <div className="mb-2 block w-full rounded-md p-2 text-left  hover:bg-[#30303a]">
            <p className="mb-2">{forename}</p>
            <p className="mb-2 text-sm text-gray-400">Level: {level}</p>
          </div>
          <button
            onClick={() => {
              window.location.href = "/api/auth/logout";
            }}
            className="block w-full rounded-md p-2 text-left text-red-400 hover:bg-[#30303a] hover:cursor-pointer"
          >
            Log ud
          </button>
        </div>
      )}
    </div>
  );
}
