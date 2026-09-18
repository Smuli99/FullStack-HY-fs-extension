import { useEffect, useState } from 'react';
import anecdoteService from '../services/anecdotes';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.target.value);
  const reset = () => setValue('');

  const fieldProps = { type, value, onChange };

  return [fieldProps, reset];
};

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await anecdoteService.getAll();
      setAnecdotes(data);
    };

    fetchData();
  }, []);

  const addAnecdote = async (obj) => {
    const newObj = await anecdoteService.createNew(obj);
    setAnecdotes(anecdotes.concat(newObj));
  };

  return { anecdotes, addAnecdote };
};