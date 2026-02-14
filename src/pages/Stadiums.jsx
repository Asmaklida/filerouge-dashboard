import React, { useState } from "react";

const stadiumData = [
  { id: 1, name: "Camp Nou", city: "Barcelona", capacity: "99354", categories: ["VIP", "Cat 1", "Cat 2", "Tribune Sud"] },
  { id: 2, name: "Santiago Bernabéu", city: "Madrid", capacity: "81044", categories: ["VIP", "Premium", "Standard"] },
  { id: 3, name: "Old Trafford", city: "Manchester", capacity: "74879", categories: ["VIP", "Cat 1", "Cat 2"] },
  { id: 4, name: "Allianz Arena", city: "Munich", capacity: "75000", categories: ["VIP", "Premium", "Economy", "Tribune Nord"] },
  { id: 5, name: "Parc des Princes", city: "Paris", capacity: "47929", categories: ["VIP", "Cat 1"] },
  { id: 6, name: "Anfield", city: "Liverpool", capacity: "53394", categories: ["Kop", "Main Stand", "Anfield Road"] },
  { id: 7, name: "Emirates Stadium", city: "London", capacity: "60704", categories: ["Premium", "Standard", "Economy"] },
  { id: 8, name: "San Siro", city: "Milan", capacity: "80018", categories: ["VIP", "Cat 1", "Cat 2", "Curva Nord", "Curva Sud"] },
];

const Stadiums = () => {
  const [stadiums, setStadiums] = useState(stadiumData);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stadiumToEdit, setStadiumToEdit] = useState(null);
  const [stadiumToDelete, setStadiumToDelete] = useState(null); // Nouvel état pour la suppression
  const [newStadium, setNewStadium] = useState({
    name: "",
    city: "",
    capacity: "",
    categories: "",
  });
  const [editNewCategory, setEditNewCategory] = useState(""); // Nouvel état pour les catégories d'édition

  // Génère la liste des villes uniques
  const cities = [...new Set(stadiums.map(stadium => stadium.city))];

  // Filtres
  const filteredStadiums = stadiums.filter(stadium => 
    stadium.name.toLowerCase().includes(search.toLowerCase()) &&
    (cityFilter === "All Cities" || stadium.city === cityFilter)
  );

  // Gestion des actions
  const handleDelete = (id) => {
    setStadiums(stadiums.filter(stadium => stadium.id !== id));
  };

  const handleEdit = (stadium) => {
    setStadiumToEdit(stadium);
    setEditNewCategory(""); // Réinitialise l'input des catégories
  };

  const handleUpdate = () => {
    if (!stadiumToEdit) return;
    
    setStadiums(stadiums.map(stadium => 
      stadium.id === stadiumToEdit.id ? stadiumToEdit : stadium
    ));
    
    setStadiumToEdit(null);
    setEditNewCategory(""); // Réinitialise l'input des catégories
  };

  const handleAddStadium = () => {
    if (!newStadium.name.trim() || !newStadium.city.trim() || !newStadium.capacity.trim()) return;
    
    const nextId = stadiums.length > 0 ? Math.max(...stadiums.map(s => s.id)) + 1 : 1;
    
    setStadiums([
      ...stadiums,
      {
        id: nextId,
        name: newStadium.name.trim(),
        city: newStadium.city.trim(),
        capacity: newStadium.capacity.trim(),
        categories: newStadium.categories.split(",").map(cat => cat.trim()).filter(cat => cat),
      }
    ]);
    
    setNewStadium({ name: "", city: "", capacity: "", categories: "" });
    setIsModalOpen(false);
  };

  // Gestion des catégories dans le modal d'édition
  const handleAddCategory = () => {
    if (!editNewCategory.trim()) return;
    
    const updatedCategories = [
      ...stadiumToEdit.categories,
      editNewCategory.trim()
    ];
    
    setStadiumToEdit({
      ...stadiumToEdit,
      categories: updatedCategories
    });
    
    setEditNewCategory("");
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = stadiumToEdit.categories.filter((_, i) => i !== index);
    
    setStadiumToEdit({
      ...stadiumToEdit,
      categories: updatedCategories
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stadiums</h1>
          <p className="text-gray-500 mt-1">Manage your football stadiums</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:block">Add Stadium</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search stadiums..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
          />
          <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* City Filter - DYNAMIC avec style identique à l'image */}
        <div className="relative w-full md:w-48">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition cursor-pointer appearance-none"
          >
            <option>All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {/* Flèche personnalisée identique à l'image */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* Header - MODIFIED TO MATCH THE IMAGE */}
        <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b font-normal text-gray-500 uppercase text-xs tracking-wider">
          <div className="col-span-3">NAME</div>
          <div className="col-span-2">CITY</div>
          <div className="col-span-2">CAPACITY</div>
          <div className="col-span-4">SEATING CATEGORIES</div>
          <div className="col-span-1 text-right">ACTIONS</div>
        </div>

        {/* Rows */}
        {filteredStadiums.map((stadium) => (
          <div
            key={stadium.id}
            className="grid grid-cols-12 px-6 py-4 items-center border-b hover:bg-gray-50 transition-colors"
          >
            {/* Name */}
            <div className="col-span-3 font-medium text-gray-900">{stadium.name}</div>

            {/* City */}
            <div className="col-span-2 text-gray-600 flex items-center">
              <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {stadium.city}
            </div>

            {/* Capacity */}
            <div className="col-span-2 text-gray-600 flex items-center">
              <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.289 2.252M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {stadium.capacity} seats
            </div>

            {/* Seating Categories */}
            <div className="col-span-4 flex flex-wrap gap-1.5">
              {stadium.categories.map((category) => (
                <span 
                  key={category}
                  className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="col-span-1 flex justify-end gap-1">
              {/* Edit icon - black */}
              <button
                onClick={() => handleEdit(stadium)}
                className="p-1.5 text-gray-900 hover:text-black hover:bg-gray-100 rounded transition-colors"
                aria-label="Edit stadium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 10H15v3.172l8.586-8.586a2 2 0 012.828 2.828L17.828 17H15v-2.828l-8.586 8.586a2 2 0 01-2.828-2.828L12.172 5H11V2.172l-8.586 8.586a2 2 0 01-2.828-2.828L11 5z" />
                </svg>
              </button>
              
              {/* Delete icon - red */}
              <button
                onClick={() => setStadiumToDelete(stadium.id)} // Changement ici
                className="p-1.5 text-red-500 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                aria-label="Delete stadium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.133 21H7.867a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Stadium Modal - CORRECTED TO MATCH THE IMAGE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Stadium</h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewStadium({ name: "", city: "", capacity: "", categories: "" });
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stadium Name</label>
                  <input
                    type="text"
                    value={newStadium.name}
                    onChange={(e) => setNewStadium({ ...newStadium, name: e.target.value })}
                    placeholder="Enter stadium name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={newStadium.city}
                    onChange={(e) => setNewStadium({ ...newStadium, city: e.target.value })}
                    placeholder="Enter city"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="text"
                    value={newStadium.capacity}
                    onChange={(e) => setNewStadium({ ...newStadium, capacity: e.target.value })}
                    placeholder="Enter capacity"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
             <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Seating Categories</label>
  <p className="text-xs text-gray-500 mb-1">Add categories like VIP, Premium, Standard, etc.</p>
  <div className="flex">
    <input
      type="text"
      value={newStadium.categories}
      onChange={(e) => setNewStadium({ ...newStadium, categories: e.target.value })}
      placeholder="e.g, VIP, Premium, Cat 1..."
      className="w-full px-4 py-2.5 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition flex-1"
    />
    <button
      className="bg-green-500 text-white px-4 py-2.5 rounded-r-lg hover:bg-green-600 transition-colors"
    >
      Add
    </button>
  </div>
</div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setNewStadium({ name: "", city: "", capacity: "", categories: "" });
                    }}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddStadium}
                    disabled={!newStadium.name.trim() || !newStadium.city.trim() || !newStadium.capacity.trim()}
                    className={`px-4 py-2.5 rounded-lg font-medium ${
                      newStadium.name.trim() && newStadium.city.trim() && newStadium.capacity.trim()
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Create Stadium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Stadium Modal - CORRECTED TO MATCH THE IMAGE */}
      {stadiumToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Edit Stadium</h2>
                <button
                  onClick={() => {
                    setStadiumToEdit(null);
                    setEditNewCategory("");
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stadium Name</label>
                  <input
                    type="text"
                    value={stadiumToEdit.name}
                    onChange={(e) => setStadiumToEdit({ ...stadiumToEdit, name: e.target.value })}
                    placeholder="Enter stadium name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={stadiumToEdit.city}
                    onChange={(e) => setStadiumToEdit({ ...stadiumToEdit, city: e.target.value })}
                    placeholder="Enter city"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="text"
                    value={stadiumToEdit.capacity}
                    onChange={(e) => setStadiumToEdit({ ...stadiumToEdit, capacity: e.target.value })}
                    placeholder="Enter capacity"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition"
                  />
                </div>
                
                {/* Seating Categories - CORRECTED TO MATCH THE IMAGE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seating Categories</label>
                  <p className="text-xs text-gray-500 mb-1">Add categories like VIP, Premium, Standard, etc.</p>
                  <div className="flex">
                    <input
                      type="text"
                      value={editNewCategory}
                      onChange={(e) => setEditNewCategory(e.target.value)}
                      placeholder="e.g, VIP, Premium, Cat 1..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 focus:outline-none transition flex-1"
                    />
                    <button
                      onClick={handleAddCategory}
                      className="bg-green-500 text-white px-4 py-2.5 rounded-r-lg hover:bg-green-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Added Categories:</label>
                    <div className="flex flex-wrap gap-1.5">
                      {stadiumToEdit.categories.map((category, index) => (
                        <span 
                          key={index}
                          className="bg-green-100 text-green-800 px-2.5 py-1 rounded-md text-sm font-medium flex items-center"
                        >
                          {category}
                          <button
                            onClick={() => handleRemoveCategory(index)}
                            className="ml-1.5 text-green-600 hover:text-green-800"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setStadiumToEdit(null);
                      setEditNewCategory("");
                    }}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={!stadiumToEdit.name.trim() || !stadiumToEdit.city.trim() || !stadiumToEdit.capacity.trim()}
                    className={`px-4 py-2.5 rounded-lg font-medium ${
                      stadiumToEdit.name.trim() && stadiumToEdit.city.trim() && stadiumToEdit.capacity.trim()
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Update Stadium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Stadium Modal - CORRECTED TO MATCH THE IMAGE */}
      {stadiumToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Delete Stadium</h2>
                <button
                  onClick={() => setStadiumToDelete(null)}
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
                  {stadiums.find(s => s.id === stadiumToDelete)?.name}
                </span>
                ? This action cannot be undone.
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setStadiumToDelete(null)}
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDelete(stadiumToDelete);
                    setStadiumToDelete(null);
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
};

export default Stadiums;