import { useState } from "react";

const matchesData = [
  { id: 1, match: "FC Barcelona vs Real Madrid", stadium: "Camp Nou", category: "VIP", date: "15/02/2026", price: 120 },
  { id: 2, match: "Manchester United vs Liverpool FC", stadium: "Anfield", category: "Standard", date: "16/02/2026", price: 95 },
  { id: 3, match: "Bayern Munich vs Borussia Dortmund", stadium: "Allianz Arena", category: "VIP", date: "17/02/2026", price: 85 },
];

export default function Matches() {
  const [matches, setMatches] = useState(matchesData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [formData, setFormData] = useState({
    match: "",
    stadium: "",
    category: "",
    date: "",
    price: "",
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
      setFormData(match);
    } else {
      setCurrentMatch(null);
      setFormData({ match: "", stadium: "", category: "", date: "", price: "" });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.match || !formData.stadium) return;

    if (currentMatch) {
      setMatches(matches.map((m) => (m.id === currentMatch.id ? { ...m, ...formData } : m)));
    } else {
      const newMatch = { ...formData, id: matches.length + 1 };
      setMatches([...matches, newMatch]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setMatches(matches.filter((m) => m.id !== id));
  };

  const getCategoryColor = (category) => {
    if (category === "VIP") return "bg-purple-100 text-purple-700";
    if (category === "Premium") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Matches</h1>
          <p className="text-gray-500">Manage football matches</p>
        </div>

        <button
          onClick={() => handleOpen()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add Match
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search matches..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
      />

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow bg-white mt-4">
        <div className="grid grid-cols-12 px-6 py-3 bg-gray-100 font-semibold text-gray-600">
          <div className="col-span-4">Match</div>
          <div className="col-span-2">Stadium</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {filteredMatches.map((m) => (
          <div
            key={m.id}
            className="grid grid-cols-12 px-6 py-4 items-center border-t hover:bg-gray-50 transition"
          >
            <div className="col-span-4 font-medium">{m.match}</div>
            <div className="col-span-2">{m.stadium}</div>
            <div className="col-span-2">
              <span className={`px-3 py-1 text-xs rounded-full font-medium ${getCategoryColor(m.category)}`}>
                {m.category}
              </span>
            </div>
            <div className="col-span-2">{m.date}</div>
            <div className="col-span-1 font-semibold">${m.price}</div>

            <div className="col-span-1 flex justify-end gap-2">
              <button
                onClick={() => handleOpen(m)}
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(m.id)}
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold">
              {currentMatch ? "Edit Match" : "Add Match"}
            </h2>

            <input
              type="text"
              placeholder="Match"
              value={formData.match}
              onChange={(e) => setFormData({ ...formData, match: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <input
              type="text"
              placeholder="Stadium"
              value={formData.stadium}
              onChange={(e) => setFormData({ ...formData, stadium: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <input
              type="text"
              placeholder="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
