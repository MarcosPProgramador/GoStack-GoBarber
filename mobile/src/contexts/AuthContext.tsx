import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import api from '../services/api';

interface ISignInFormData {
  email: string;
  password: string;
}
interface IAuthState {
  token: string;
  user: object;
}
interface IAuthContext {
  signIn: (data: ISignInFormData) => Promise<void>;
  signOut: () => void;
  user: object;
  loading: boolean;
}
const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({} as IAuthState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStoragedData() {
      const [user, token] = await AsyncStorage.multiGet(['@GoBarber:user', '@GoBarber:token']);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);
  const signIn = useCallback(async (formData: ISignInFormData) => {
    const {
      data: { token, user },
    } = await api.post('/sessions', formData);

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({
      user,
      token,
    });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ loading, user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { IAuthContext, AuthContext };

export default AuthProvider;
