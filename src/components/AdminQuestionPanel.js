import { useState, useEffect } from 'react';

const AdminQuestionPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [category, setCategory] = useState('sucursal');

  useEffect(() => {
    // Aquí iría la carga inicial de preguntas desde la API
    const initialQuestions = [
      { id: 1, text: '¿El área de ventas está limpia y ordenada?', category: 'sucursal' },
      { id: 2, text: '¿Los empleados visten el uniforme completo?', category: 'empleados' }
    ];
    setQuestions(initialQuestions);
  }, []);

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, {
        id: Date.now(),
        text: newQuestion,
        category
      }]);
      setNewQuestion('');
    }
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Panel de Administración</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Pregunta:</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2"
            placeholder="Escribe la nueva pregunta..."
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="sucursal">Sucursal</option>
            <option value="empleados">Empleados</option>
          </select>
          <button
            onClick={handleAddQuestion}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Preguntas Actuales:</h3>
        {questions.map((question) => (
          <div key={question.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
            <div>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded mr-2">
                {question.category === 'sucursal' ? 'Sucursal' : 'Empleados'}
              </span>
              <span>{question.text}</span>
            </div>
            <button
              onClick={() => handleDeleteQuestion(question.id)}
              className="text-red-600 hover:text-red-800"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQuestionPanel;