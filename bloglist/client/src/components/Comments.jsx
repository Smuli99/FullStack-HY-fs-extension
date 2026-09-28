import { useState } from 'react';
import { useBlogs } from '../hooks/useBlogs';
import useNotify from '../hooks/useNotify';

import { Button, TextField, Typography } from '@mui/material';

const Comments = ({ blog, user }) => {
  const [comment, setComment] = useState('');
  const { addComment } = useBlogs();
  const { notify, resetNotify } = useNotify();

  const hasComments = blog.comments.length > 0;

  const handleComment = async () => {
    try {
      await addComment(blog.id, comment);
      notify('Comment added successfully!');
      setComment('');
    } catch (error) {
      notify(error.response.data.error, 'warning');
      setTimeout(() => resetNotify(), 3000);
    }
  };

  return (
    <div className='comments'>
      <Typography variant='h6' style={{ marginTop: 25 }}>
        {hasComments ? 'Comments' : 'No comments'}
      </Typography>

      {user && (
        <div className='addComment'>
          <TextField
            size='small'
            label='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder='add a comment'
          />
          <Button
            variant='outlined'
            onClick={handleComment}
            style={{ padding: 6 }}
          >
            add comment
          </Button>
        </div>
      )}

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