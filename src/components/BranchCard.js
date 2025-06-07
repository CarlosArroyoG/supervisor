const BranchCard = ({ branch }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">{branch.name}</h3>
        <p className="text-gray-600 mt-2">{branch.address}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${branch.status === 'good' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {branch.status === 'good' ? 'En orden' : 'Requiere atención'}
          </span>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Evaluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;