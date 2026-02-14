import { useState } from "react";

const matchesData = [
  { id: 1, match: "FC Barcelona vs Real Madrid", stadium: "Camp Nou", category: "VIP", date: "15/02/2026", price: 120 },
  { id: 2, match: "Manchester United vs Liverpool FC", stadium: "Anfield", category: "Standard", date: "16/02/2026", price: 95 },
  { id: 3, match: "Bayern Munich vs Borussia Dortmund", stadium: "Allianz Arena", category: "VIP", date: "17/02/2026", price: 85 },
  { id: 4, match: "Paris Saint-Germain vs Olympique Marseille", stadium: "Parc des Princes", category: "VIP", date: "18/02/2026", price: 110 },
  { id: 5, match: "AC Milan vs Inter Milan", stadium: "San Siro", category: "VIP", date: "20/02/2026", price: 100 },
  { id: 6, match: "Arsenal vs Chelsea", stadium: "Emirates Stadium", category: "Premium", date: "22/02/2026", price: 105 },
  { id: 7, match: "Real Madrid vs FC Barcelona", stadium: "Santiago Bernabéu", category: "Premium", date: "25/02/2026", price: 130 },
  { id: 8, match: "Liverpool FC vs Arsenal", stadium: "Anfield", category: "Standard", date: "28/02/2026", price: 90 },
];

// Données des équipes (ajoutées pour le modal)
const teams = [
  { id: 1, name: "FC Barcelona" },
  { id: 2, name: "Real Madrid" },
  { id: 3, name: "Manchester United" },
  { id: 4, name: "Liverpool FC" },
  { id: 5, name: "Bayern Munich" },
  { id: 6, name: "Borussia Dortmund" },
  { id: 7, name: "Paris Saint-Germain" },
  { id: 8, name: "Olympique Marseille" },
  { id: 9, name: "AC Milan" },
  { id: 10, name: "Inter Milan" },
  { id: 11, name: "Arsenal" },
  { id: 12, name: "Chelsea" },
];

// Données des stades (ajoutées pour le modal)
const stadiums = [
  { id: 1, name: "Camp Nou" },
  { id: 2, name: "Santiago Bernabéu" },
  { id: 3, name: "Anfield" },
  { id: 4, name: "Old Trafford" },
  { id: 5, name: "Allianz Arena" },
  { id: 6, name: "Parc des Princes" },
  { id: 7, name: "San Siro" },
  { id: 8, name: "Emirates Stadium" },
];

export default function Matches() {
  const [matches, setMatches] = useState(matchesData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [formData, setFormData] = useState({
    teamA: "",
    teamB: "",
    stadium: "",
    category: "",
    date: "",
    price: "",
    imageUrl: "",
  });

  const filteredMatches = matches.filter(
    (m) =>
      m.match.toLowerCase().includes(search.toLowerCase()) ||
      m.stadium.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = (match = null) => {
    if (match) {
      setCurrentMatch(match);
      // Extraire les équipes à partir du nom du match
      const [teamA, teamB] = match.match.split(" vs ");
      setFormData({
        teamA,
        teamB,
        stadium: match.stadium,
        category: match.category,
        date: match.date,
        price: match.price,
        imageUrl: "",
      });
    } else {
      setCurrentMatch(null);
      setFormData({
        teamA: "",
        teamB: "",
        stadium: "",
        category: "",
        date: "",
        price: "",
        imageUrl: "",
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.teamA || !formData.teamB || !formData.stadium) return;

    const matchName = `${formData.teamA} vs ${formData.teamB}`;
    
    if (currentMatch) {
      setMatches(matches.map((m) => 
        m.id === currentMatch.id ? { 
          ...m, 
          match: matchName,
          stadium: formData.stadium,
          category: formData.category,
          date: formData.date,
          price: Number(formData.price),
        } : m
      ));
    } else {
      const newMatch = { 
        ...formData, 
        id: matches.length + 1,
        match: matchName,
        price: Number(formData.price),
      };
      setMatches([...matches, newMatch]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setMatches(matches.filter((m) => m.id !== id));
  };

  // MODIFICATION CLÉ : Suppression du paramètre inutilisé
  const getCategoryColor = () => {
    return "bg-gray-100 text-gray-700"; // Toujours gris
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
          <p className="text-gray-500 mt-1">Manage football matches</p>
        </div>
        <button
          onClick={() => handleOpen()}
          className="bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:block">Add Match</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search matches..."
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
        <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b font-normal text-gray-500 uppercase text-xs tracking-wider">
          <div className="col-span-4">MATCH</div>
          <div className="col-span-2">STADIUM</div>
          <div className="col-span-2">CATEGORY</div>
          <div className="col-span-2">DATE</div>
          <div className="col-span-1">PRICE</div>
          <div className="col-span-1 text-right">ACTIONS</div>
        </div>

        {filteredMatches.map((m) => (
          <div
            key={m.id}
            className="grid grid-cols-12 px-6 py-4 items-center border-b hover:bg-gray-50 transition-colors"
          >
            <div className="col-span-4 font-medium text-gray-900">{m.match}</div>
            <div className="col-span-2 text-gray-600">{m.stadium}</div>
            <div className="col-span-2">
              <span className={`px-2.5 py-1.5 rounded-md text-sm font-medium ${getCategoryColor()}`}>
                {m.category}
              </span>
            </div>
            <div className="col-span-2 text-gray-600">{m.date}</div>
            <div className="col-span-1 font-medium text-gray-900">${m.price}</div>

            <div className="col-span-1 flex justify-end gap-1">
              {/* Edit icon - black */}
              <button
                onClick={() => handleOpen(m)}
                className="p-1.5 text-gray-900 hover:text-black hover:bg-gray-100 rounded transition-colors"
                aria-label="Edit match"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 10H15v3.172l8.586-8.586a2 2 0 012.828 2.828L17.828 17H15v-2.828l-8.586 8.586a2 2 0 01-2.828-2.828L12.172 5H11V2.172l-8.586 8.586a2 2 0 01-2.828-2.828L11 5z" />
                </svg>
              </button>
              
              {/* Delete icon - red */}
              <button
                onClick={() => handleDelete(m.id)}
                className="p-1.5 text-red-500 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                aria-label="Delete match"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentMatch ? "Edit Match" : "Add New Match"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-5">
                {/* Team A */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team A</label>
                  <select
                    value={formData.teamA}
                    onChange={(e) => setFormData({ ...formData, teamA: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  >
                    <option value="">Select a team</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Team B */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team B</label>
                  <select
                    value={formData.teamB}
                    onChange={(e) => setFormData({ ...formData, teamB: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  >
                    <option value="">Select a team</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Stadium */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stadium</label>
                  <select
                    value={formData.stadium}
                    onChange={(e) => setFormData({ ...formData, stadium: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  >
                    <option value="">Select a stadium</option>
                    {stadiums.map((stadium) => (
                      <option key={stadium.id} value={stadium.name}>
                        {stadium.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Stadium Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stadium Category</label>
                  <p className="text-xs text-gray-500 mb-1">Auto-filled from selected stadium</p>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  >
                    <option value="">Select a category</option>
                    <option value="VIP">VIP</option>
                    <option value="Premium">Premium</option>
                    <option value="Standard">Standard</option>
                    <option value="Economy">Economy</option>
                  </select>
                </div>
                
                {/* Ticket Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g, 120"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                {/* Date & Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="jj/mm/aaaa --:--"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                {/* Match Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Match Image URL (Optional)</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/match.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!formData.teamA || !formData.teamB || !formData.stadium}
                    className={`px-4 py-2.5 rounded-lg font-medium ${
                      formData.teamA && formData.teamB && formData.stadium
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
    </div>
  );
}