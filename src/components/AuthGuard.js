import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthGuard = ({ children, adminOnly = false }) => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (adminOnly && !isAdmin) {
      navigate('/');
    }
  }, [currentUser, isAdmin, navigate]);

  if (!currentUser || (adminOnly && !isAdmin)) {
    return null;
  }

  return children;
};

export default AuthGuard;