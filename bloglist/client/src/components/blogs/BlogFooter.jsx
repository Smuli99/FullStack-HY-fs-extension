import { useBlog } from '../../hooks/hooks';
import { useBlogActions } from '../../stores/blogStore';
import { useNotify } from '../../stores/notificationStore';
import { useNavigate } from 'react-router-dom';
import { useUserActions } from '../../stores/userStore';
import { Button } from '@mui/material';

const BlogFooter = () => {
  const blog = useBlog();
  const { remove } = useBlogActions();
  const { getUsers } = useUserActions();

  const notify = useNotify();
  const navigate = useNavigate();

  const handleRemove = async () => {
    if (!window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )) return;

    try {
      await remove(blog);
      await getUsers();
      notify({ message: `Blog ${blog.title} by ${blog.author} deleted!` });
      navigate('/');
    } catch (error) {
      notify({ message: error.response.data.error, type: 'error' });
    }
  };

  return (
    <Button
      style={{ marginTop: 10 }}
      size="small"
      color="error"
      variant="outlined"
      onClick={handleRemove}
    >
      delete
    </Button>
  );
};

export default BlogFooter;