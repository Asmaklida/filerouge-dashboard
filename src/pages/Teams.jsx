import React, { useState } from "react";

const leagues = [
  { id: 1, name: "Premier League" },
  { id: 2, name: "La Liga" },
  { id: 3, name: "Bundesliga" },
  { id: 4, name: "Serie A" },
];

const initialTeams = [
  { id: 1, name: "Arsenal", leagueId: 1 },
  { id: 2, name: "Chelsea", leagueId: 1 },
  { id: 3, name: "Barcelona", leagueId: 2 },
  { id: 4, name: "Real Madrid", leagueId: 2 },
  { id: 5, name: "Bayern Munich", leagueId: 3 },
];

export default function Teams() {
  const [teams, setTeams] = useState(initialTeams);
  const [search, setSearch] = useState("");
  const [league, setLeague] = useState("all");

  const filteredTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) &&
      (league === "all" || t.leagueId === Number(league))
  );

  const handleDelete = (id) => {
    setTeams(teams.filter((t) => t.id !== id));
  };

  const getLeagueName = (id) => leagues.find((l) => l.id === id)?.name;

  const getAvatarColor = (id) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-amber-500"];
    return colors[(id - 1) % colors.length];
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Teams</h1>
        <p className="text-gray-500">Manage football teams</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-3 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* League Filter */}
        <select
          value={league}
          onChange={(e) => setLeague(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          <option value="all">All leagues</option>
          {leagues.map((l) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow bg-white">
        {/* Header */}
        <div className="grid grid-cols-12 px-6 py-3 bg-gray-100 font-semibold text-gray-600">
          <div className="col-span-1">Logo</div>
          <div className="col-span-5">Name</div>
          <div className="col-span-5">League</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Rows */}
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="grid grid-cols-12 px-6 py-4 items-center border-t hover:bg-gray-50 transition"
          >
            {/* Avatar */}
            <div className="col-span-1 flex justify-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getAvatarColor(team.id)}`}>
                {team.name.charAt(0)}
              </div>
            </div>

            {/* Name */}
            <div className="col-span-5 font-medium">{team.name}</div>

            {/* League */}
            <div className="col-span-5 text-gray-600">{getLeagueName(team.leagueId)}</div>

            {/* Actions */}
            <div className="col-span-1 flex justify-end gap-2">
              <button
                onClick={() => alert(`Edit ${team.name}`)}
                className="p-2 rounded hover:bg-gray-200 text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(team.id)}
                className="p-2 rounded hover:bg-red-100 text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
