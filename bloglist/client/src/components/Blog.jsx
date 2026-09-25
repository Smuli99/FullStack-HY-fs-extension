import {
  Card, CardContent, Button,
  Typography, Link
} from '@mui/material';

import { useBlogs } from '../hooks/useBlogs';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../hooks/useEntity';
import useNotify from '../hooks/useNotify';

import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Blog = ({ user }) => {
  const blog = useBlog();
  const { updateBlog, removeBlog } = useBlogs();
  const { notify, resetNotify } = useNotify();
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      await updateBlog(blog);
    } catch (error) {
      notify(error.response.data.error, 'error');
      setTimeout(() => resetNotify(), 3000);
    }
  };

  const handleRemove = async () => {
    if (!window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )) return;

    try {
      await removeBlog(blog.id);
      navigate('/');
      notify(`Blog ${blog.title} by ${blog.author} deleted!`);
      setTimeout(() => resetNotify(), 3000);
    } catch (error) {
      notify(error.response.data.error, 'error');
      setTimeout(() => resetNotify(), 3000);
    }
  };

  return (
    <Card className='blog'>
      <CardContent>
        <Typography variant='h6'>{blog.title}</Typography>
        <Typography variant='subtitle1'>by {blog.author}</Typography>

        <Typography style={{ marginTop: '10px' }}>
          <Link href={blog.url}>
            <LinkIcon className='icon' fontSize='small'/>
            {blog.url}
          </Link>
        </Typography>

        <Typography style={{ marginTop: '10px', marginLeft: '5px' }}>
          <FavoriteBorderOutlinedIcon className='icon' fontSize='small' />
          likes: {blog.likes}

          {user && (
            <Button size='small' variant='outlined' onClick={handleLike} style={{ marginLeft: 10 }}>
              like
            </Button>
          )}
        </Typography>

        <Typography variant='body1' style={{ marginTop: '10px', marginLeft: '5px' }}>
          Added by {blog.user.name}
        </Typography>

        {user && blog.user.username === user.username && (
          <Button
            style={{ marginTop: 10 }}
            size='small'
            color='error'
            variant='outlined'
            onClick={handleRemove}
          >
            delete
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Blog;