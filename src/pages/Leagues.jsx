import React, { useState } from "react";

const leagueData = [
  { id: 1, name: "La Liga", country: "Spain" },
  { id: 2, name: "Premier League", country: "England" },
  { id: 3, name: "Bundesliga", country: "Germany" },
  { id: 4, name: "Ligue 1", country: "France" },
  { id: 5, name: "Serie A", country: "Italy" },
];

const League = () => {
  const [leagues, setLeagues] = useState(leagueData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentLeague, setCurrentLeague] = useState(null);
  const [formData, setFormData] = useState({ name: "", country: "" });

  const filteredLeagues = leagues.filter(
    (league) =>
      league.name.toLowerCase().includes(search.toLowerCase()) ||
      league.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = (league = null) => {
    if (league) {
      setCurrentLeague(league);
      setFormData({ name: league.name, country: league.country });
    } else {
      setCurrentLeague(null);
      setFormData({ name: "", country: "" });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.country) return;

    if (currentLeague) {
      setLeagues(
        leagues.map((l) =>
          l.id === currentLeague.id ? { ...l, ...formData } : l
        )
      );
    } else {
      const newLeague = {
        id: leagues.length + 1,
        ...formData,
      };
      setLeagues([...leagues, newLeague]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setLeagues(leagues.filter((l) => l.id !== id));
  };

  const getColor = (id) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-amber-500",
    ];
    return colors[(id - 1) % colors.length];
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Leagues</h1>
          <p className="text-gray-500">Manage football leagues</p>
        </div>

        <button
          onClick={() => handleOpen()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add League
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search leagues..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
      />

      {/* Table */}
      <div className="rounded-xl border border-gray-200 shadow bg-white overflow-hidden mt-4">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-3 bg-gray-100 text-gray-600 font-semibold">
          <div className="col-span-1">Logo</div>
          <div className="col-span-5">Name</div>
          <div className="col-span-5">Country</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Table Rows */}
        {filteredLeagues.map((league) => (
          <div
            key={league.id}
            className="grid grid-cols-12 px-6 py-4 items-center border-t hover:bg-gray-50 transition"
          >
            <div className="col-span-1 flex justify-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getColor(league.id)}`}>
                {league.name.charAt(0)}
              </div>
            </div>

            <div className="col-span-5">{league.name}</div>
            <div className="col-span-5">{league.country}</div>

            <div className="col-span-1 flex justify-end gap-2">
              <button
                onClick={() => handleOpen(league)}
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(league.id)}
                className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold">
              {currentLeague ? "Edit League" : "Add League"}
            </h2>

            <input
              type="text"
              placeholder="League Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <input
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                {currentLeague ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default League;
