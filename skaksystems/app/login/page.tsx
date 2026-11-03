import { count } from "console";
import React from "react";

function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="rounded-lg bg-blue-500 text-white p-10 flex flex-col gap-4">
        <h1 className="bg-blue-500 text-white rounded-lg text-center text-xl font-bold p-2">
          Login
        </h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          className="border border-black bg-blue-200 text-black rounded-md p-2"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          className="border border-black bg-blue-200 text-black rounded-md p-2"
        />
        <br></br>
        <button className="border border-black bg-blue-900 rounded-md p-2 hover:cursor-pointer text-center">
          Login
        </button>
      </div>
    </main>
  );
}

export default page;
