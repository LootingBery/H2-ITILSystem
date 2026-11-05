import React from "react";

function page() {
  return (
    <main>
      <div className="p-4 text-white bg-slate-900 min-h-screen">
        <div className=" relative mb-4 flex flex-row items-center">
          <h1 className="text-2xl font-bold">SLA | Service Level Agreement</h1>
          <div className="absolute right-0 flex gap-2">
            <a
              href="/admin"
              className="border border-black bg-blue-900 rounded-md p-2 hover:cursor-pointer text-center"
            >
              Back to admin
            </a>
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-blue-400/70" />
      </div>
    </main>
  );
}

export default page;
