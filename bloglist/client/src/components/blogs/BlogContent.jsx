import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNotify } from '../../stores/notificationStore';
import { useBlogActions } from '../../stores/blogStore';

import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const BlogContent = ({ blog, user }) => {
  const { update } = useBlogActions();
  const notify = useNotify();

  const handleLike = async () => {
    try {
      await update(blog);
      notify({ message: `blog '${blog.title}' liked!` });
    } catch (error) {
      notify({ message: error.response.data.error, type: 'error' });
    }
  };

  const likeButton = (
    <Button
      size="small"
      variant="outlined"
      onClick={handleLike}
      style={{ marginLeft: 10 }}
    >
      like
    </Button>
  );

  return (
    <div>
      <Typography variant="h6">{blog.title}</Typography>
      <Typography variant="subtitle1">by {blog.author}</Typography>

      <Typography style={{ marginTop: '10px' }}>
        <Link href={blog.url}>
          <LinkIcon className="icon" fontSize="small" />
          {blog.url}
        </Link>
      </Typography>

      <Typography style={{ marginTop: '10px', marginLeft: '5px' }}>
        <FavoriteBorderOutlinedIcon className="icon" fontSize="small" />
        likes: {blog.likes}
        {user && likeButton}
      </Typography>

      <Typography
        variant="body1"
        style={{ marginTop: '10px', marginLeft: '5px' }}
      >
        Added by {blog.user.name}
      </Typography>
    </div>
  );
};

export default BlogContent;