import { useState, useEffect } from 'react';
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button } from '@mui/material';
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
  const [blogs, setBlogs] = useState([]);

  const { notify, resetNotify } = useNotify();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogServices.getAll();
      setBlogs(blogs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      blogServices.setToken(user.token);
    }
  }, [user]);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

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

  const createBlog = async (blog) => {
    try {
      const savedBlog = await blogServices.create(blog);
      setBlogs(blogs.concat(savedBlog));

      notify(`\`${blog.title}\` by ${blog.author} added!`);
      setTimeout(() => resetNotify(), 3000);
    } catch (error) {
      notify(error.response.data.error, 'error');
      setTimeout(() => resetNotify(), 3000);
    }
  };

  const updateBlogsLikes = async (blog) => {
    try {
      const blogToUpdate = {
        ...blog,
        likes: blog.likes + 1
      };

      const updatedBlog = await blogServices.update(blogToUpdate);
      setBlogs(
        blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
      );
    } catch (error) {
      console.log(error);

      notify(error.response.data.error, 'error');
      setTimeout(() => resetNotify(), 3000);
    }
  };

  const removeBlog = async (blogToDelete) => {
    if (!window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
    )) return;

    navigate('/');

    try {
      await blogServices.remove(blogToDelete);

      setBlogs(
        blogs.filter(blog => blog.id !== blogToDelete.id)
      );

      notify(`Blog ${blogToDelete.title} by ${blogToDelete.author} deleted!`);
      setTimeout(() => resetNotify(), 3000);
    } catch (error) {
      notify(error.response.data.error, 'error');
      setTimeout(() => resetNotify(), 3000);
    }
  };

  const match = useMatch('/blogs/:id');
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null;


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
          <Route path='/' element={
            <BlogApp
              blogs={sortedBlogs}
              user={user}
              removeBlog={removeBlog}
            />
          } />
          <Route path='/blogs/:id' element={
            <Blog
              blog={blog}
              user={user}
              removeBlog={removeBlog}
              updateBlogsLikes={updateBlogsLikes}
            />
          } />
          <Route path='/login' element={
            <LoginForm login={login} />
          } />
          <Route path='/create' element={
            <NewBlogForm createBlog={createBlog} />
          } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
};

export default App;