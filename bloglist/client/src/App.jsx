import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button } from '@mui/material';
import { useBlogs } from './hooks/useBlogs';
import { useNavigate } from 'react-router-dom';
import useNotify from './hooks/useNotify';
import useUser from './hooks/useUser';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogApp from './components/BlogApp';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import Users from './components/Users';

const App = () => {
  const { user, logout } = useUser();
  const { isPending } = useBlogs();
  const { notify, resetNotify } = useNotify();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    notify('logged out succesfully');
    setTimeout(() => resetNotify(), 3000);
    navigate('/');
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <Container>
      <AppBar position='static' sx={{ marginTop: 1 }}>
        <Toolbar>
          <p style={{ flexGrow: 1, fontSize: '1.3em' }}>Blog App</p>
          <div>
            <Button color='inherit' component={Link} to='/'>blogs</Button>
            { user && <Button color='inherit' component={Link} to='/users'>users</Button> }
            { user && <Button color='inherit' component={Link} to='/create'>new blog</Button> }
            { !user && <Button color='inherit' component={Link} to='/login'>login</Button> }
            { user && <Button color='inherit' onClick={handleLogout}>logout</Button> }
          </div>
        </Toolbar>
      </AppBar>


      <ErrorBoundary>
        <Notification />

        <Routes>
          <Route path='/' element={ <BlogApp /> } />
          <Route path='/blogs/:id' element={ <Blog user={user} /> } />
          <Route path='/login' element={ <LoginForm /> } />
          <Route path='/create' element={ <NewBlogForm /> } />
          <Route path='/users' element={ <Users /> } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
};

export default App;