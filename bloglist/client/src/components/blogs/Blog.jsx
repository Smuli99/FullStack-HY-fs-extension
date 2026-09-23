import { Card, CardContent, Typography } from '@mui/material';
import { useBlog } from '../../hooks/hooks';
import { useUser } from '../../stores/userStore';

import BlogContent from './BlogContent';
import BlogCommentSection from './BlogCommentSection';
import BlogFooter from './BlogFooter';

const Blog = () => {
  const blog = useBlog();
  const user = useUser();

  if (!blog) return <Typography variant='h5'>Loading...</Typography>;

  return (
    <Card className="blog">
      <CardContent>
        <BlogContent blog={blog} user={user} />
        <BlogCommentSection blog={blog} />
        {user && blog.user.username === user.username && <BlogFooter />}
      </CardContent>
    </Card>
  );
};

export default Blog;
