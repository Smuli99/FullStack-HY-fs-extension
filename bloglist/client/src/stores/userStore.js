import { create } from 'zustand';
import { useEffect } from 'react';

import loginService from '../services/login';
import userService from '../services/users';
import persistentUser from '../services/persistentUser';

const useUserStore = create(set => ({
  user: persistentUser.getUser(),
  users: [],
  actions: {
    login: async (credentials) => {
      const user = await loginService.login(credentials);
      persistentUser.saveUser(user);
      set(() => ({ user }));
    },
    logout: () => {
      persistentUser.removeUser();
      set(() => ({ user: null }));
    },
    getUsers: async () => {
      const users = await userService.getAll();
      set(() => ({ users }));
    },
  }
}));

export const useUser = () => useUserStore(state => state.user);
export const useUsers = () => {
  const users = useUserStore(state => state.users);
  const getUsers = useUserStore(state => state.actions.getUsers);

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  }, [getUsers, users.length]);

  const sortedUsers = [...users].sort((a, b) => b.blogs.length - a.blogs.length);
  return sortedUsers;
};

export const useUserActions = () => useUserStore(state => state.actions);