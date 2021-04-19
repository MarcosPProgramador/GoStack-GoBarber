import { useFonts as fonts } from 'expo-font';
import React from 'react';
import Loading from '../components/Loading';

interface IResponse {
  loaded: boolean;
  loading: React.FC;
  error: Error | null;
}
function useFonts(): IResponse {
  const [loaded, error] = fonts({
    'RobotoSlab-Medium': require('../../assets/fonts/RobotoSlab-Medium.ttf'),
    'RobotoSlab-Regular': require('../../assets/fonts/RobotoSlab-Regular.ttf'),
  });
  return { loaded, error, loading: Loading };
}
export default useFonts;
