const EvaluationForm = () => {
  const [evaluation, setEvaluation] = React.useState({
    cleanliness: 0,
    organization: 0,
    inventory: 0,
    process: 0,
    appearance: 0,
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluation(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Evaluación de Sucursal</h2>
      
      <div className="space-y-6">
        {['cleanliness', 'organization', 'inventory', 'process', 'appearance'].map((item) => (
          <div key={item}>
            <label className="block text-gray-700 font-medium mb-2 capitalize">
              {item.replace('_', ' ')}
            </label>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-center">
                  <input
                    type="radio"
                    id={`${item}-${num}`}
                    name={item}
                    value={num}
                    checked={evaluation[item] == num}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`${item}-${num}`} className="ml-2 text-gray-700">
                    {num}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
            Observaciones
          </label>
          <textarea
            id="notes"
            name="notes"
            rows="4"
            value={evaluation.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
          Enviar Evaluación
        </button>
      </div>
    </div>
  );
};

export default EvaluationForm;