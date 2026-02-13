import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Leagues from "./pages/Leagues";
import Matches from "./pages/Matches";
import Teams from "./pages/Teams";
import Stadiums from "./pages/Stadiums";
import Profile from "./pages/Profile";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <Dashboard />;
      case "leagues": return <Leagues />;
      case "matches": return <Matches />;
      case "teams": return <Teams />;
      case "stadiums": return <Stadiums />;
      case "profile": return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex gap-4">
        {["dashboard", "leagues", "matches", "teams", "stadiums", "profile"].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded ${
              currentPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </nav>

      {/* Page content */}
      <main>{renderPage()}</main>
    </div>
  );
}
