export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center font-sans text-white">
      <div className="flex flex-col bg-gray-600/80 max-w-2xl w-full h-120 rounded-md">
        <form className="justify-center flex flex-col gap-4 p-4">
          <label htmlFor="title" className="text-xl font-bold">
            Title:
            <input
              type="text"
              id="title"
              name="title"
              required
              className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
            />
          </label>

          <div className="text-md text-start">
            <label htmlFor="common-issue" className="font-bold ">
              Common issues:
              <br />
              <span className="relative mt-2 block">
                <select
                  id="common-issue"
                  name="commonIssue"
                  defaultValue=""
                  className="w-full appearance-none rounded-lg border  border-slate-500 bg-slate-800 px-4 py-3 pr-10 text-left text-sm font-normal text-white shadow-sm outline-none transition-colors hover:border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40"
                >
                  <option>Select an issue</option>
                  <option>My opponent is cheating</option>
                  <option>How do I checkmate</option>
                  <option>Am I the best chess player</option>
                  <option>Is William really bad at chess</option>
                  <option>Uhmmmm, how does the queen move?</option>
                  <option>Is castling in chess illegal?</option>
                  <option>Will I go to jail for beating a minor?</option>
                  <option>How good is William at chess?</option>
                  <option>Is bery the greatest?</option>
                  <option>How good is bery really?</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-300">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </label>
          </div>
          <label htmlFor="description" className="text-md font-bold mt-1">
            Description:
            <textarea
              id="description"
              name="description"
              required
              rows={6}
              className="mt-1 block w-full resize-y rounded-md border border-slate-300 bg-blue-200 p-3 text-black shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
            />
          </label>

          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
