import { useState } from "react";

// Mock data
const mockStadiums = [
  { id: 1, name: "Camp Nou", categories: ["VIP", "Cat 1"] },
  { id: 2, name: "Anfield", categories: ["VIP", "Standard"] },
  { id: 3, name: "Allianz Arena", categories: ["VIP", "Premium"] },
  { id: 4, name: "Parc des Princes", categories: ["VIP", "Cat 1"] },
  { id: 5, name: "San Siro", categories: ["VIP", "Cat 1"] },
  { id: 6, name: "Santiago Bernabéu", categories: ["VIP", "Premium"] },
  { id: 7, name: "Old Trafford", categories: ["VIP", "Cat 1"] },
  { id: 8, name: "Emirates Stadium", categories: ["Premium", "Standard"] },
];

const mockLeagues = ["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1"];

const mockTeams = ["Arsenal", "Chelsea", "Barcelona", "Real Madrid", "Bayern Munich", "PSG", "AC Milan", "Inter Milan"];

const mockMatches = [
  { id: 1, teamA: "FC Barcelona", teamB: "Real Madrid", stadium: "Camp Nou", date: "15/02/2026", ticketPrice: 120, status: "Upcoming" },
  { id: 2, teamA: "Manchester United", teamB: "Liverpool FC", stadium: "Anfield", date: "16/02/2026", ticketPrice: 95, status: "Upcoming" },
  { id: 3, teamA: "Bayern Munich", teamB: "Borussia Dortmund", stadium: "Allianz Arena", date: "17/02/2026", ticketPrice: 85, status: "Upcoming" },
  { id: 4, teamA: "PSG", teamB: "Olympique Marseille", stadium: "Parc des Princes", date: "18/02/2026", ticketPrice: 110, status: "Upcoming" },
  { id: 5, teamA: "AC Milan", teamB: "Inter Milan", stadium: "San Siro", date: "20/02/2026", ticketPrice: 100, status: "Upcoming" },
];

// KPI Card Component
function KPICard({ title, value, subtitle }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:border-white/40 transition cursor-default">
      <p className="text-xs uppercase text-gray-300 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      <span className="text-sm text-gray-400 mt-1 inline-block">{subtitle}</span>
    </div>
  );
}

// Main Dashboard
export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`${darkMode ? "bg-[#0f172a] text-white" : "bg-gray-50 text-gray-900"} min-h-screen p-8 font-sans`}>
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold mb-1">Dashboard</h1>
          <p className="text-gray-400 max-w-sm">Welcome back, here's what's happening</p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KPICard title="Total Stadiums" value={mockStadiums.length} subtitle={`${mockStadiums.length * 2} Active`} />
        <KPICard title="Total Leagues" value={mockLeagues.length} subtitle={`${mockLeagues.length * 3} Registered`} />
        <KPICard title="Active Matches" value={mockMatches.length} subtitle={`${Math.floor(mockMatches.length / 2)} Ongoing`} />
        <KPICard title="Active Teams" value={mockTeams.length} subtitle={`${Math.floor(mockTeams.length / 3)} Registered`} />
      </section>

      {/* Recent Matches Table */}
      <section className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/20">
          <h2 className="text-xl font-semibold text-white">Recent Matches</h2>
        </div>
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-white/20">
            <tr>
              <th className="px-6 py-3 uppercase font-semibold tracking-wide">Match</th>
              <th className="px-6 py-3 uppercase font-semibold tracking-wide">Stadium</th>
              <th className="px-6 py-3 uppercase font-semibold tracking-wide">Date</th>
              <th className="px-6 py-3 uppercase font-semibold tracking-wide">Price</th>
              <th className="px-6 py-3 uppercase font-semibold tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockMatches.map(({ id, teamA, teamB, stadium, date, ticketPrice, status }) => (
              <tr
                key={id}
                className="border-t border-white/10 hover:bg-white/20 transition cursor-pointer"
              >
                <td className="px-6 py-4">{teamA} vs {teamB}</td>
                <td className="px-6 py-4">{stadium}</td>
                <td className="px-6 py-4">{date}</td>
                <td className="px-6 py-4">${ticketPrice}</td>
                <td className="px-6 py-4">
                  <span className="bg-gray-700 bg-opacity-50 px-3 py-1 rounded-full text-xs font-semibold text-gray-200">
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
