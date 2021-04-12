import React, { createContext, useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../services/api';
interface AuthState {
  token: string;
  user: object;
}
export interface ISignInCredentials {
  email: string;
  password: string;
}
interface IAuthContext {
  user: object,
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {

  const history = useHistory()

  const [data, setData] = useState<AuthState>(() => {

    const token = localStorage.getItem('@GoBarber:token')
    const user = localStorage.getItem('@GoBarber:user')

    if (token && user) return { token, user: JSON.parse(user) }

    return {} as AuthState
  })


  const signIn = useCallback(async ({ email, password }: ISignInCredentials) => {

    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    setData({ token, user })
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')


    setData({} as AuthState)

    history.push('/')

  }, [history])


  return (
    <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider