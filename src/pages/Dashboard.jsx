export default function Dashboard() {
  const stats = [
    { title: "Total Stadiums", value: 8, badge: "+16 Active", icon: "🏟️" },
    { title: "Total Leagues", value: 5, badge: "+15 Registered", icon: "🏆" },
    { title: "Active Matches", value: 8, badge: "+4 Ongoing", icon: "🎟️" },
    { title: "Active Teams", value: 12, badge: "+4 Registered", icon: "👥" },
  ];
  const StadiumIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth="1.5" d="M3 21h18M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16M9 21V9h6v12" />
  </svg>
);

const LeagueIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth="1.5" d="M8 21h8M12 3v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

const MatchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.5" />
    <path strokeWidth="1.5" d="M7 10h.01M7 14h.01M17 10h.01M17 14h.01" />
  </svg>
);

const TeamIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="9" cy="7" r="3" strokeWidth="1.5" />
    <circle cx="17" cy="7" r="3" strokeWidth="1.5" />
    <path strokeWidth="1.5" d="M2 21c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path strokeWidth="1.5" d="M14 21c0-2.2 1.8-4 4-4s4 1.8 4 4" />
  </svg>
);


  const matches = [
    {
      match: "FC Barcelona vs Real Madrid",
      stadium: "Camp Nou",
      date: "15/02/2026",
      price: "$120",
      status: "Upcoming",
    },
    {
      match: "Manchester United vs Liverpool FC",
      stadium: "Anfield",
      date: "16/02/2026",
      price: "$95",
      status: "Upcoming",
    },
    {
      match: "Bayern Munich vs Borussia Dortmund",
      stadium: "Allianz Arena",
      date: "17/02/2026",
      price: "$85",
      status: "Upcoming",
    },
    {
      match: "Paris Saint-Germain vs Olympique Marseille",
      stadium: "Parc des Princes",
      date: "18/02/2026",
      price: "$110",
      status: "Upcoming",
    },
    {
      match: "AC Milan vs Inter Milan",
      stadium: "San Siro",
      date: "20/02/2026",
      price: "$100",
      status: "Upcoming",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back, here's what's happening
        </p>
      </div>

      {/* Stats Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  {stats.map((s, i) => (
    <div
      key={i}
      className="
        rounded-2xl p-6
        bg-gradient-to-br from-white to-sky-50
        border border-sky-200
        shadow-sm
      "
    >
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-200 mb-4 text-gray-700">
        {s.icon}
      </div>

      {/* Title */}
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
        {s.title}
      </p>

      {/* Value */}
      <p className="text-3xl font-bold text-gray-900 mb-3">
        {s.value}
      </p>

      {/* Badge */}
      <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-700">
        ↑ {s.badge}
      </span>
    </div>
  ))}
</div>


      {/* Recent Matches */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-gray-900">Recent Matches</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Match</th>
                <th className="px-6 py-3 text-left">Stadium</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {matches.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {m.match}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {m.stadium}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {m.date}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {m.price}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
