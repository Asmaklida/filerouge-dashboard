import React, { useState } from "react";

const stadiumData = [
  { id: 1, name: "Camp Nou", city: "Barcelona", capacity: "99 354", categories: ["VIP", "Cat 1", "Cat 2", "Tribune Sud"] },
  { id: 2, name: "Santiago Bernabéu", city: "Madrid", capacity: "81 044", categories: ["VIP", "Premium", "Standard"] },
  { id: 3, name: "Old Trafford", city: "Manchester", capacity: "74 879", categories: ["VIP", "Cat 1", "Cat 2"] },
  { id: 4, name: "Allianz Arena", city: "Munich", capacity: "75 000", categories: ["VIP", "Premium", "Economy", "Tribune Nord"] },
  { id: 5, name: "Parc des Princes", city: "Paris", capacity: "47 929", categories: ["VIP", "Cat 1"] },
  { id: 6, name: "Anfield", city: "Liverpool", capacity: "53 394", categories: ["Kop", "Main Stand", "Anfield Road"] },
  { id: 7, name: "Emirates Stadium", city: "London", capacity: "60 704", categories: ["Premium", "Standard", "Economy"] },
  { id: 8, name: "San Siro", city: "Milan", capacity: "80 018", categories: ["VIP", "Cat 1", "Cat 2", "Curva Nord", "Curva Sud"] },
];

const Stadiums = () => {
  const [stadiums] = useState(stadiumData);

  const handleEdit = (name) => alert(`Edit ${name}`);
  const handleDelete = (name) => alert(`Delete ${name}`);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Stadiums</h1>

      <table className="w-full border-collapse bg-white shadow rounded">
        <thead>
          <tr className="text-left border-b">
            <th className="p-3">Name</th>
            <th className="p-3">City</th>
            <th className="p-3">Capacity</th>
            <th className="p-3">Seating Categories</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stadiums.map((stadium) => (
            <tr key={stadium.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-semibold">{stadium.name}</td>
              <td className="p-3 text-gray-500">{stadium.city}</td>
              <td className="p-3 text-gray-500">{stadium.capacity} seats</td>
              <td className="p-3 flex gap-1 flex-wrap">
                {stadium.categories.map((cat) => (
                  <span key={cat} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                    {cat}
                  </span>
                ))}
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleEdit(stadium.name)}
                  className="text-blue-500 hover:text-blue-700 px-2 py-1 border rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(stadium.name)}
                  className="text-red-500 hover:text-red-700 px-2 py-1 border rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stadiums;
