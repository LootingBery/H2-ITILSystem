import { count } from "console";
import React from "react";

function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="rounded-lg bg-gray-600/80 text-white p-10 flex flex-col gap-1">
        <h1 className=" text-white rounded-lg text-center text-xl font-bold p-2">
          Login
        </h1>
        <label htmlFor="username" className="text-lg font-medium">
          Username:
        </label>
        <input
          id="username"
          type="text"
          name="username"
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
