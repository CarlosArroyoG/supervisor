import React, { useState } from 'react';
import { branches, evaluations } from './mock/branches';
import SupervisorHeader from './components/SupervisorHeader';
import BranchCard from './components/BranchCard';
import EvaluationForm from './components/EvaluationForm';
import EvaluationSummary from './components/EvaluationSummary';

const App = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [view, setView] = useState('branches'); // 'branches', 'evaluate', 'summary'

  const handleEvaluate = (branch) => {
    setSelectedBranch(branch);
    setView('evaluate');
  };

  const handleBack = () => {
    setView('branches');
    setSelectedBranch(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SupervisorHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {view === 'branches' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Tus Sucursales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch) => (
                <BranchCard 
                  key={branch.id} 
                  branch={branch} 
                  onEvaluate={() => handleEvaluate(branch)}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'evaluate' && (
          <div className="max-w-3xl mx-auto">
            <button 
              onClick={handleBack}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a sucursales
            </button>
            <EvaluationForm />
          </div>
        )}

        {view === 'summary' && selectedBranch && (
          <div className="max-w-3xl mx-auto">
            <button 
              onClick={handleBack}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a sucursales
            </button>
            <EvaluationSummary 
              evaluations={evaluations.filter(e => e.branchId === selectedBranch.id)} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

// DONE