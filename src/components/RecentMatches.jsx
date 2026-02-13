export default function RecentMatches({ matches }) {
  return (
    <div className="bg-white shadow rounded p-5 mt-5">
      <h2 className="font-bold text-lg mb-4">Recent Matches</h2>
      <table className="w-full text-left">
        <thead className="text-gray-500">
          <tr>
            <th>Match</th>
            <th>Stadium</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {matches.map((match, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td>{match.name}</td>
              <td>{match.stadium}</td>
              <td>{match.date}</td>
              <td>{match.price}</td>
              <td>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">{match.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}