import { useUsers } from '../../stores/userStore';
import { useEntitityById } from '../../hooks/hooks';

import { Card, CardContent, Typography } from '@mui/material';

const User = () => {
  const users = useUsers();
  const user = useEntitityById(users);

  if (!user) return <Typography variant='h5'>Loading...</Typography>;

  const noBlogs = (
    <Typography variant='h6' style={{ marginTop: '15px' }}>
      User has not added any blogs
    </Typography>
  );

  const hasBlogs = (
    <div>
      <Typography variant='h6' style={{ marginTop: '15px' }}>Added Blogs</Typography>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <Card className='user'>
      <CardContent>
        <Typography variant='h5'>{user.name}</Typography>
        {user.blogs.length > 0 && hasBlogs}
        {user.blogs.length < 1 && noBlogs}
      </CardContent>
    </Card>
  );
};

export default User;