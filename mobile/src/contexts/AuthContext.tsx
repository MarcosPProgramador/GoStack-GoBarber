import React, { createContext, useCallback, useState } from 'react';

interface SignInFormData {
  email: string;
  password: string;
}
interface IAuthContext {
  SignIn: (data: SignInFormData) => void;
  SignOut: () => void;
}
const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState();
  const SignIn = useCallback(async (data: SignInFormData) => {
    console.log(data);
  }, []);
  const SignOut = useCallback(() => {
    console.log('out');
  }, []);

  return <AuthContext.Provider value={{ SignIn, SignOut }}>{children}</AuthContext.Provider>;
};

export { IAuthContext, AuthContext };

export default AuthProvider;
