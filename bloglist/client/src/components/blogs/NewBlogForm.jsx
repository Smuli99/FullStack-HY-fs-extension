import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useBlogActions } from '../../stores/blogStore';
import { useNotify } from '../../stores/notificationStore';
import { useUserActions } from '../../stores/userStore';

const NewBlogForm = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const { add } = useBlogActions();
  const { getUsers } = useUserActions();
  const notify = useNotify();
  const navigate = useNavigate();

  const handleNewBlog = async (event) => {
    event.preventDefault();

    try {
      await add({ title, author, url, likes: 0 });
      await getUsers();

      notify({ message: `\`${title}\` by ${author} added!` });

      navigate('/');
      setUrl('');
      setTitle('');
      setAuthor('');
    } catch (error) {
      notify({ message: error.response.data.error, type: 'error' });
    }
  };

  return (
    <div>
      <h2>Create New Blog</h2>

      <form onSubmit={handleNewBlog} className="blogForm">
        <TextField
          size="small"
          label="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          size="small"
          label="auhtor"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          size="small"
          label="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <div>
          <Button size="small" type="submit" variant="outlined">
            create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;
