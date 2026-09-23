import { Typography, TextField, Button } from '@mui/material';
import { useBlogActions } from '../../stores/blogStore';
import { useNotify } from '../../stores/notificationStore';
import { useState } from 'react';

const BlogCommentSection = ({ blog }) => {
  const [comment, setComment] = useState('');
  const { addComment } = useBlogActions();
  const notify = useNotify();

  const hasComments = blog.comments.length > 0;

  const handleComment = async () => {
    if (comment.trim().length < 1) {
      notify({ message: 'Comment should not be empty', type: 'warning' });
      return;
    }

    try {
      await addComment(blog, comment);
      setComment('');
    } catch (error) {
      notify({ message: error.response.data.error, type: 'error' });
    }
  };

  return (
    <div>
      <Typography variant='h6' style={{ marginTop: 20 }}>
        {hasComments ? 'comments' : 'no comments'}
      </Typography>
      <div className='commentField'>
        <TextField
          variant='outlined'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder='add a comment'
          label='comment'
          type='text'
          size='small'
        />
        <Button
          size="big"
          variant="outlined"
          onClick={handleComment}
        >
          add comment
        </Button>
      </div>
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

export default BlogCommentSection;