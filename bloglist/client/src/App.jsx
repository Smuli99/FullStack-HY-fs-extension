import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button } from '@mui/material';
import { useBlogs } from './hooks/useBlogs';
import useNotify from './hooks/useNotify';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogApp from './components/BlogApp';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import ErrorBoundary from './components/ErrorBoundary';

import blogServices from './services/blogs';
import loginServices from './services/login';
import NotFound from './components/NotFound';


const App = () => {
  const getLoggedUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    return loggedUserJSON
      ? JSON.parse(loggedUserJSON)
      : null;
  };

  const [user, setUser] = useState(getLoggedUser);

  const { isPending } = useBlogs();
  const { notify, resetNotify } = useNotify();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      blogServices.setToken(user.token);
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const user = await loginServices.login(credentials);
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );

      blogServices.setToken(user.token);

      setUser(user);

      notify(`${user.username} logged in!`);
      setTimeout(() => resetNotify(), 3000);
    } catch {
      notify('wrong username or password', 'error');
      setTimeout(() => resetNotify(), 3000);
    };
  };

  const handleLogout = () => {
    navigate('/');
    window.localStorage.clear();
    setUser(null);

    notify('logged out succesfully');
    setTimeout(() => resetNotify(), 3000);
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <Container>
      <AppBar position='static' sx={{ marginTop: 1 }}>
        <Toolbar>
          <p style={{ flexGrow: 1, fontSize: '1.3em' }}>Blog App</p>
          <div>
            <Button color='inherit' component={Link} to='/'>blogs</Button>
            {user && <Button color='inherit' component={Link} to='/create'>new blog</Button>}
            {!user && <Button color='inherit' component={Link} to='/login'>login</Button>}
            {user && <Button color='inherit' onClick={handleLogout}>logout</Button>}
          </div>
        </Toolbar>
      </AppBar>


      <ErrorBoundary>
        <Notification />

        <Routes>
          <Route path='/' element={ <BlogApp user={user} /> } />
          <Route path='/blogs/:id' element={ <Blog user={user} /> } />
          <Route path='/login' element={ <LoginForm login={login} /> } />
          <Route path='/create' element={ <NewBlogForm /> } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
};

export default App;