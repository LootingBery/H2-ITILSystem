function page() {
  return (
    <main className="min-h-screen bg-[#101116] text-white">
      <div className="container mx-auto px-4">
        <h1 className="flex text-3xl justify-center font-bold mt-10">
          Documentation
        </h1>
      </div>
      <div className="mx-auto mt-25 h-[70vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-900 w-full max-w-3xl overflow-y-auto rounded-md bg-blue-300/30 p-4 text-center">
        <div className="flex flex-col mb-1 mt-1 bg-amber-50/10 p-4 rounded-md w-2/3 mx-auto">
          <p className="text-2xl">This is the closed ticket title.</p>
          <p className="text-lg text-gray-200">
            This is the documentation page.
          </p>
          <p className="text-sm text-gray-400">Ticket closed by: employee</p>
        </div>
      </div>
    </main>
  );
}

export default page;
