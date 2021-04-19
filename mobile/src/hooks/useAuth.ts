import { useContext } from 'react';
import { AuthContext, IAuthContext } from '../contexts/AuthContext';

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) throw new Error('AuthProvider is required to useAuth');

  return context;
}

export default useAuth;
