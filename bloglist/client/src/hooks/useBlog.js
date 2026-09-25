import { useParams } from 'react-router-dom';
import { useBlogs } from './useBlogs';

const useEntityById = (entities) => {
  const { id } = useParams();
  return entities.find(entity => entity.id === id);
};

export const useBlog = () => {
  const { blogs } = useBlogs();
  return useEntityById(blogs);
};