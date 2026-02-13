import { Link } from "react-router-dom";
import { FaHome, FaBuilding, FaTrophy, FaUsers, FaFutbol } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-5 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Football Admin</h1>

      <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
        <FaHome /> Dashboard
      </Link>

      <Link to="/stadiums" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
        <FaBuilding /> Stadiums
      </Link>

      <Link to="/leagues" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
        <FaTrophy /> Leagues
      </Link>

      <Link to="/teams" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
        <FaUsers /> Teams
      </Link>

      <Link to="/matches" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
        <FaFutbol /> Matches
      </Link>
    </div>
  );
};

export default Sidebar;