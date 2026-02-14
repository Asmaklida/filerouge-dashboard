import React, { useState } from "react";

const leagues = [
  { id: 1, name: "Premier League" },
  { id: 2, name: "La Liga" },
  { id: 3, name: "Bundesliga" },
  { id: 4, name: "Serie A" },
  { id: 5, name: "Ligue 1" },    
];

const initialTeams = [
  { 
    id: 1, 
    name: "FC Barcelona", 
    leagueId: 2,
    logoUrl: "image1.png"
  },
  { 
    id: 2, 
    name: "Real Madrid", 
    leagueId: 2,
    logoUrl: "image2.png"
  },
  { 
    id: 3, 
    name: "Manchester United", 
    leagueId: 1,
    logoUrl: "image3.png"
  },
  { 
    id: 4, 
    name: "Liverpool FC", 
    leagueId: 1,
    logoUrl: "image4.png"
  },
  { 
    id: 5, 
    name: "Bayern Munich", 
    leagueId: 3,
    logoUrl: "image5.png"
  },
  { 
    id: 6, 
    name: "Borussia Dortmund", 
    leagueId: 3,
    logoUrl: "image6.png"
  },
  { 
    id: 7, 
    name: "Paris Saint-Germain", 
    leagueId: 5,
    logoUrl: "image7.png"
  },
  { 
    id: 8, 
    name: "Olympique Marseille", 
    leagueId: 5,
    logoUrl: "image8.png"
  },
  { 
    id: 9, 
    name: "AC Milan", 
    leagueId: 4,
    logoUrl: "image9.png"
  },
  { 
    id: 10, 
    name: "Inter Milan", 
    leagueId: 4,
    logoUrl: "image10.png"
  },
  { 
    id: 11, 
    name: "Arsenal", 
    leagueId: 1,
    logoUrl: "image11.png"
  },
  { 
    id: 12, 
    name: "Chelsea", 
    leagueId: 1,
    logoUrl: "image12.png"
  },
];

export default function Teams() {
  const [teams, setTeams] = useState(initialTeams);
  const [search, setSearch] = useState("");
  const [league, setLeague] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: "",
    leagueId: "",
    logoUrl: "",
  });
  const [editingTeam, setEditingTeam] = useState(null);
  const [teamToDelete, setTeamToDelete] = useState(null); // Nouvel état pour la suppression

  const filteredTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) &&
      (league === "all" || t.leagueId === Number(league))
  );

  const handleDelete = (id) => {
    setTeams(teams.filter((t) => t.id !== id));
  };

  const getLeagueName = (id) => leagues.find((l) => l.id === id)?.name;

  const handleCreateTeam = () => {
    if (!newTeam.name.trim() || !newTeam.leagueId) return;
    
    const nextId = teams.length > 0 ? Math.max(...teams.map(t => t.id)) + 1 : 1;
    
    setTeams([
      ...teams,
      {
        id: nextId,
        name: newTeam.name.trim(),
        leagueId: Number(newTeam.leagueId),
        logoUrl: newTeam.logoUrl.trim(),
      }
    ]);
    
    setNewTeam({ name: "", leagueId: "", logoUrl: "" });
    setIsModalOpen(false);
  };

  const handleUpdateTeam = () => {
    if (!editingTeam?.name.trim() || !editingTeam?.leagueId) return;
    
    setTeams(teams.map(team => 
      team.id === editingTeam.id ? editingTeam : team
    ));
    
    setEditingTeam(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-500 mt-1">Manage football teams</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:block">Add Team</span>
        </button>
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
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
          />
          <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* League Filter - MODIFICATION CLÉ */}
        <div className="relative">
          <select
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            className="appearance-none px-4 py-2.5 pl-4 pr-8 rounded-lg border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition cursor-pointer"
          >
            <option value="all">All Leagues</option>
            {leagues.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* Header */}
        <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b font-medium text-gray-700">
          <div className="col-span-1">Logo</div>
          <div className="col-span-6">Name</div>
          <div className="col-span-4">League</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Rows */}
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="grid grid-cols-12 px-6 py-4 items-center border-b hover:bg-gray-50 transition-colors"
          >
            {/* Logo */}
            <div className="col-span-1 flex items-center">
              <img 
                src={team.logoUrl} 
                alt={team.name} 
                className="w-8 h-8 object-contain rounded-full"
              />
            </div>

            {/* Name */}
            <div className="col-span-6 font-medium text-gray-900">{team.name}</div>

            {/* League */}
            <div className="col-span-4 text-gray-600">{getLeagueName(team.leagueId)}</div>

            {/* Actions */}
            <div className="col-span-1 flex justify-end gap-1">
              {/* Pencil icon - black */}
              <button
                onClick={() => setEditingTeam({...team})} // Ouvre le modal d'édition
                className="p-1.5 text-gray-900 hover:text-black hover:bg-gray-100 rounded transition-colors"
                aria-label="Edit team"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 10H15v3.172l8.586-8.586a2 2 0 012.828 2.828L17.828 17H15v-2.828l-8.586 8.586a2 2 0 01-2.828-2.828L12.172 5H11V2.172l-8.586 8.586a2 2 0 01-2.828-2.828L11 5z" />
                </svg>
              </button>
              
              {/* Trash icon - red */}
              <button
                onClick={() => setTeamToDelete(team.id)} // Changement ici
                className="p-1.5 text-red-500 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                aria-label="Delete team"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.133 21H7.867a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Team Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Team</h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewTeam({ name: "", leagueId: "", logoUrl: "" });
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                  <input
                    type="text"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    placeholder="Enter team name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">League</label>
                  <select
                    value={newTeam.leagueId}
                    onChange={(e) => setNewTeam({ ...newTeam, leagueId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  >
                    <option value="">Select a league</option>
                    {leagues.map((league) => (
                      <option key={league.id} value={league.id}>
                        {league.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL (Optional)</label>
                  <input
                    type="text"
                    value={newTeam.logoUrl}
                    onChange={(e) => setNewTeam({ ...newTeam, logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png    "
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setNewTeam({ name: "", leagueId: "", logoUrl: "" });
                    }}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateTeam}
                    disabled={!newTeam.name.trim() || !newTeam.leagueId}
                    className={`px-4 py-2.5 rounded-lg font-medium ${
                      newTeam.name.trim() && newTeam.leagueId
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Team Modal - CORRECTED TO MATCH THE IMAGES */}
      {editingTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Edit Team</h2>
                <button
                  onClick={() => setEditingTeam(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                  <input
                    type="text"
                    value={editingTeam.name}
                    onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                    placeholder="Enter team name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">League</label>
                  <select
                    value={editingTeam.leagueId}
                    onChange={(e) => setEditingTeam({ ...editingTeam, leagueId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  >
                    {leagues.map((league) => (
                      <option key={league.id} value={league.id}>
                        {league.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL (Optional)</label>
                  <input
                    type="text"
                    value={editingTeam.logoUrl}
                    onChange={(e) => setEditingTeam({ ...editingTeam, logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png  "
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setEditingTeam(null)}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateTeam}
                    disabled={!editingTeam.name.trim() || !editingTeam.leagueId}
                    className={`px-4 py-2.5 rounded-lg font-medium ${
                      editingTeam.name.trim() && editingTeam.leagueId
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Team Modal - CORRECTED TO MATCH THE IMAGE */}
      {teamToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Delete Team</h2>
                <button
                  onClick={() => setTeamToDelete(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium text-gray-900">
                  {teams.find(t => t.id === teamToDelete)?.name}
                </span>
                ? This action cannot be undone.
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setTeamToDelete(null)}
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDelete(teamToDelete);
                    setTeamToDelete(null);
                  }}
                  className="px-4 py-2.5 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}