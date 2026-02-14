const DashboardCard = ({ title, value, subtitle, }) => {
  return (
    <div className="bg-white shadow rounded p-5 flex flex-col gap-2 w-56">
      <div className="flex items-center gap-3">
        
        <h2 className="text-sm uppercase text-gray-500">{title}</h2>
      </div>
      <h1 className="text-2xl font-bold">{value}</h1>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  );
};

export default DashboardCard; // export par défaut