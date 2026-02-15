import React, { useState } from "react";

const leagueData = [
  { id: 1, name: "La Liga", country: "Spain", logoUrl: "https://example.com/laliga.png" },
  { id: 2, name: "Premier League", country: "England", logoUrl: "https://example.com/premier.png" },
  { id: 3, name: "Bundesliga", country: "Germany", logoUrl: "https://example.com/bundesliga.png" },
  { id: 4, name: "Ligue 1", country: "France", logoUrl: "https://example.com/ligue1.png" },
  { id: 5, name: "Serie A", country: "Italy", logoUrl: "https://example.com/seriea.png" },
];

const League = () => {
  const [leagues, setLeagues] = useState(leagueData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentLeague, setCurrentLeague] = useState(null);
  const [formData, setFormData] = useState({ name: "", country: "", logoUrl: "" });

  // Extraction des pays uniques pour le dropdown
  const uniqueCountries = [...new Set(leagues.map(league => league.country))];

  const filteredLeagues = leagues.filter(
    (league) =>
      league.name.toLowerCase().includes(search.toLowerCase()) ||
      league.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = (league = null) => {
    if (league) {
      setCurrentLeague(league);
      setFormData({ 
        name: league.name, 
        country: league.country,
        logoUrl: league.logoUrl || ""
      });
    } else {
      setCurrentLeague(null);
      setFormData({ 
        name: "", 
        country: "",
        logoUrl: ""
      });
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
      "bg-amber-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[(id - 1) % colors.length];
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leagues</h1>
          <p className="text-gray-500 mt-1">Manage football leagues</p>
        </div>
        
        {/* Bouton Add League */}
        <button
          onClick={() => handleOpen()}
          className="bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:block">Add League</span>
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search leagues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
        />
        <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* EN-TÊTES EN GRAS */}
        <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b font-bold text-gray-900 uppercase text-xs tracking-wider">
          <div className="col-span-1">Logo</div>
          <div className="col-span-5">Name</div>
          <div className="col-span-5">Country</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {filteredLeagues.map((league) => (
          <div
            key={league.id}
            className="grid grid-cols-12 px-6 py-4 items-center border-b hover:bg-gray-50 transition-colors"
          >
            {/* LOGOS CORRECTEMENT POSITIONNÉS */}
            <div className="col-span-1 flex items-center justify-left h-full">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getColor(league.id)}`}>
                {league.name.charAt(0)}
              </div>
            </div>

            <div className="col-span-5 font-medium">{league.name}</div>
            <div className="col-span-5">{league.country}</div>

            <div className="col-span-1 flex justify-end gap-1">
              {/* Edit icon */}
              <button
                onClick={() => handleOpen(league)}
                className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-colors"
                aria-label="Edit league"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 10H15v3.172l8.586-8.586a2 2 0 012.828 2.828L17.828 17H15v-2.828l-8.586 8.586a2 2 0 01-2.828-2.828L12.172 5H11V2.172l-8.586 8.586a2 2 0 01-2.828-2.828L11 5z" />
                </svg>
              </button>

              {/* Delete icon */}
              <button
                onClick={() => handleDelete(league.id)}
                className="p-1.5 text-red-500 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                aria-label="Delete league"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.133 21H7.867a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
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
              {currentLeague ? "Edit League" : "Add New League"}
            </h2>

            {/* MODIFICATION : Champ League Name en dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                League Name
              </label>
              <select
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              >
                <option value="">Select a league</option>
                {leagues.map((league) => (
                  <option key={league.id} value={league.name}>
                    {league.name}
                  </option>
                ))}
              </select>
            </div>

            {/* MODIFICATION : Champ Country en dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              >
                <option value="">Select a country</option>
                {uniqueCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="Logo URL (Optional)"
              value={formData.logoUrl}
              onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
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
                className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
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