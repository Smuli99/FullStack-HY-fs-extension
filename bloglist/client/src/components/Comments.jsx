import { Typography } from '@mui/material';

const Comments = ({ blog, user }) => {
  const hasComments = blog.comments.length > 0;

  return (
    <div className='comments'>
      <Typography variant='h6' style={{ marginTop: 25 }}>
        {hasComments ? 'Comments' : 'No comments'}
      </Typography>

      {hasComments && (
        <ul>
          {blog.comments.map(comment => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;