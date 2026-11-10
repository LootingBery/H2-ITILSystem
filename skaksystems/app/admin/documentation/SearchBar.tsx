"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("query") ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("query", search.trim());
      } else {
        params.delete("query");
      }

      const newUrl = `${pathname}?${params.toString()}`;

      if (search.trim() !== (searchParams.get("query") ?? "")) {
        router.replace(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, pathname, router, searchParams]);

  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        Search closed tickets
      </label>

      <input
        id="search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-md border border-slate-600 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none placeholder:text-gray-400 focus:border-blue-400"
      />

      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}
