"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function page() {
  const [forename, setForename] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        forename,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      return;
    }
  }
  router.push("/admin");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="rounded-lg bg-gray-600/80 text-white p-10 flex flex-col gap-1">
        <h1 className=" text-white rounded-lg text-center text-xl font-bold p-2">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="forename" className="text-lg font-medium">
            Forename:
          </label>

          <input
            id="forename"
            type="text"
            name="forename"
            value={forename}
            onChange={(e) => setForename(e.target.value)}
            className="border border-black bg-blue-200 text-black rounded-md p-2"
          />
          <br></br>
          <label htmlFor="password" className="text-lg font-medium">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black bg-blue-200 text-black rounded-md p-2"
          />
          <br></br>
          <button
            type="submit"
            className="border border-black bg-blue-900 rounded-md p-2 hover:cursor-pointer text-center"
          >
            Login
          </button>
          {error && <p className="text-red-400">{error}</p>}
        </form>
      </div>
    </main>
  );
}

export default page;
