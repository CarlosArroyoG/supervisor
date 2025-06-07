import { useState } from 'react';
import PhotoUploader from './PhotoUploader';

const EnhancedEvaluationForm = ({ questions }) => {
  const [evaluation, setEvaluation] = useState({
    photos: [],
    answers: {},
    notes: ''
  });

  const handlePhotoUpload = (photo) => {
    setEvaluation(prev => ({
      ...prev,
      photos: [...prev.photos, photo]
    }));
  };

  const handleAnswerChange = (questionId, value) => {
    setEvaluation(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value
      }
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Evaluación Completa</h2>
      
      <div className="space-y-8">
        {questions.filter(q => q.category === 'sucursal').length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Evaluación de Sucursal</h3>
            {questions.filter(q => q.category === 'sucursal').map(question => (
              <div key={question.id} className="mb-4">
                <label className="block text-gray-700 mb-2">{question.text}</label>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <label key={num} className="flex items-center">
                      <input
                        type="radio"
                        name={`question_${question.id}`}
                        checked={evaluation.answers[question.id] === num}
                        onChange={() => handleAnswerChange(question.id, num)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">{num}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {questions.filter(q => q.category === 'empleados').length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Evaluación de Empleados</h3>
            {questions.filter(q => q.category === 'empleados').map(question => (
              <div key={question.id} className="mb-4">
                <label className="block text-gray-700 mb-2">{question.text}</label>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <label key={num} className="flex items-center">
                      <input
                        type="radio"
                        name={`question_${question.id}`}
                        checked={evaluation.answers[question.id] === num}
                        onChange={() => handleAnswerChange(question.id, num)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">{num}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-4">Evidencia Fotográfica</h3>
          <PhotoUploader onUpload={handlePhotoUpload} />
          <div className="grid grid-cols-3 gap-2 mt-4">
            {evaluation.photos.map((photo, index) => (
              <div key={index} className="relative">
                <img src={photo} alt={`Evidencia ${index + 1}`} className="rounded-md h-24 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
            Observaciones Generales
          </label>
          <textarea
            id="notes"
            name="notes"
            rows="4"
            value={evaluation.notes}
            onChange={(e) => setEvaluation(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
          Guardar Evaluación
        </button>
      </div>
    </div>
  );
};

export default EnhancedEvaluationForm;