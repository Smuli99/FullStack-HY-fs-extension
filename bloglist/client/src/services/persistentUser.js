import blogService from './blogs';

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

  if (!loggedUserJSON) {
    return null;
  }

  const user = JSON.parse(loggedUserJSON);
  blogService.setToken(user.token);

  return user;
};

const saveUser = (user) => {
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
  blogService.setToken(user.token);
};

const removeUser = () => window.localStorage.clear();

export default {
  getUser,
  saveUser,
  removeUser,
};