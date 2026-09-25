import { Card, CardContent, Typography } from '@mui/material';
import { useUser } from '../hooks/useEntity';

const User = () => {
  const user = useUser();
  const hasBlogs = user.blogs.length > 0;

  return (
    <div className="user">
      <Card>
        <CardContent>
          <Typography variant='h5'>
            <strong>{user.name}</strong>
          </Typography>
          <Typography variant='h6' sx={{ marginTop: 2, marginLeft: 1 }}>
            {hasBlogs ? 'added blogs' : 'no blogs'}
          </Typography>
          {hasBlogs && (
            <ul>
              {user.blogs.map(blog => (
                <li key={blog.id}>{blog.title}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default User;