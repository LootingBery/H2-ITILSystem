export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans text-white">
      <div className="flex flex-col bg-gray-400 max-w-4xl w-full h-180 rounded-md">
        <form className="justify-center items-center flex flex-col gap-4 p-4">
          <div className="flex flex-col p-4 bg-blue-500 rounded-md gap-4 w-2/3 justify-center items-center">
            <label htmlFor="title" className="text-xl font-bold">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="mt-1 block w-full rounded-md border-gray-300 bg-blue-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <label htmlFor="description" className="text-md font-bold">
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              required
              className="mt-1 block w-full rounded-md border-gray-300 bg-blue-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="text-md font-bold text-center">
            <label className="text-md font-bold">
              Common issues:
              <br />
              <select className="list-disc list-inside bg-gray-600">
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
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
