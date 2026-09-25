import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useBlogs } from '../hooks/useBlogs';
import useNotify from '../hooks/useNotify';

const NewBlogForm = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const { addBlog } = useBlogs();
  const { notify, resetNotify } = useNotify();
  const navigate = useNavigate();

  const handleNewBlog = async () => {
    event.preventDefault();

    try {
      await addBlog({ title, author, url });
      notify(`\`${title}\` by ${author} added!`);
      setTimeout(() => resetNotify(), 3000);

      navigate('/');
      setUrl('');
      setTitle('');
      setAuthor('');
    } catch (error) {
      notify(error.response.data.error, 'error');
      setTimeout(() => resetNotify(), 3000);
    }
  };

  return (
    <div>
      <h2>Create New Blog</h2>

      <form onSubmit={handleNewBlog} className='blogForm'>
        <TextField
          size='small'
          label='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          size='small'
          label='auhtor'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          size='small'
          label='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <div>
          <Button size='small' type='submit' variant='outlined'>
            create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;