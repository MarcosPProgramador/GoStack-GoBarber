import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <>
      <NavigationContainer>{user ? <AppRoutes /> : <AuthRoutes />}</NavigationContainer>
    </>
  );
};
export default Routes;
