import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getBranches } from '../services/branchService';
import BranchCard from './BranchCard';

const BranchDashboard = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchesData = await getBranches();
        setBranches(branchesData);
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) {
    return <div>Cargando sucursales...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Tus Sucursales</h2>
        {isAdmin && (
          <button
            onClick={() => navigate('/admin')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Panel Admin
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <BranchCard 
            key={branch.id} 
            branch={branch} 
            onEvaluate={() => navigate(`/evaluate/${branch.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default BranchDashboard;

// DONE