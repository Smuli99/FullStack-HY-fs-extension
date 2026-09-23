import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button } from '@mui/material';
import { useBlogActions } from './stores/blogStore';
import { useUser, useUserActions } from './stores/userStore';
import { useNotify } from './stores/notificationStore';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogApp from './components/blogs/BlogApp';
import Blog from './components/blogs/Blog';
import NewBlogForm from './components/blogs/NewBlogForm';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import Users from './components/users/Users';
import User from './components/users/User';

const App = () => {
  const user = useUser();
  const { logout } = useUserActions();

  const notify = useNotify();
  const { initialize } = useBlogActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogout = () => {
    logout();
    notify({ message: 'logged out succesfully' });
  };

  return (
    <Container>
      <AppBar position="static" sx={{ marginTop: 1 }}>
        <Toolbar>
          <p style={{ flexGrow: 1, fontSize: '1.3em' }}>Blog App</p>
          <div>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color='inherit' component={Link} to='/users'>
              users
            </Button>
            {user && (
              <Button color="inherit" component={Link} to="/create">
                new blog
              </Button>
            )}
            {!user && (
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            )}
            {user && (
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Notification />

      <ErrorBoundary>
        <Routes>
          <Route path="/" element={ <BlogApp /> } />
          <Route path="/blogs/:id" element={ <Blog /> } />
          <Route path="/login" element={ <LoginForm /> } />
          <Route path="/create" element={ <NewBlogForm /> } />
          <Route path='/users' element={ <Users /> } />
          <Route path='/users/:id' element={ <User /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
};

export default App;
