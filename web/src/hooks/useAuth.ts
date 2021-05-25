import { useContext } from 'react';
import { AuthContext, IAuthContext } from '../contexts/AuthProvider';

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within a AuthProvider');

  return context;
}
export default useAuth;
