import TableRow from "./TableRow";

function Overview({ result }) {
  return (
    <div className="relative overflow-x-auto max-w-xl m-auto mt-10">
      <div className="flex justify-between items-center px-5">
        <h2 className="text-center font-bold text-2xl text-stone-800">Results</h2>
        <div>
          <span className="bg-red-100 text-red-800 text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            {result.matches.length} Detected
          </span>
        </div>
      </div>
      <table className="w-full mt-5 text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Target
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {result.matches.map((item, index) => (
            <TableRow name={item} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Overview;
