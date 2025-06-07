const EvaluationSummary = ({ evaluations }) => {
  const averageScore = evaluations.length > 0 
    ? evaluations.reduce((acc, curr) => {
        const total = curr.cleanliness + curr.organization + curr.inventory + curr.process + curr.appearance;
        return acc + (total / 5);
      }, 0) / evaluations.length
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Resumen de Evaluaciones</h2>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-600">Calificación promedio</p>
          <p className="text-4xl font-bold text-blue-600">{averageScore.toFixed(1)}/5</p>
        </div>
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-700">
            {Math.round((averageScore / 5) * 100)}%
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {evaluations.map((evaluationItem, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <p className="text-gray-600">{new Date(evaluationItem.date).toLocaleDateString()}</p>
            <div className="flex space-x-2 mt-1">
              {['cleanliness', 'organization', 'inventory', 'process', 'appearance'].map((item) => (
                <div key={item} className="text-center">
                  <p className="text-xs text-gray-500 capitalize">{item.charAt(0)}</p>
                  <p className="font-medium">{evaluationItem[item]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvaluationSummary;

// DONE