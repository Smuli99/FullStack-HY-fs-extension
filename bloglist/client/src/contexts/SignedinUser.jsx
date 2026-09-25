import { createContext, useState } from 'react';
import { getUser, removeUser, saveUser } from '../services/persistentUser';
import loginService from '../services/login';

const SignedinUserContext = createContext();

export default SignedinUserContext;

export const SignedinUserContextProvider = (props) => {
  const [user, setUser] = useState(getUser);

  const login = async (credentials) => {
    const user = await loginService.login(credentials);
    setUser(user);
    saveUser(user);
  };

  const logout = () => {
    removeUser();
    setUser(null);
  };

  return (
    <SignedinUserContext.Provider value={{ user, login, logout }}>
      {props.children}
    </SignedinUserContext.Provider>
  );
};