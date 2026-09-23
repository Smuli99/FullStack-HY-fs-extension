import { useParams } from 'react-router-dom';
import { useBlogs } from '../stores/blogStore';

export const useEntitityById = (entities) => {
  const { id } = useParams();
  return entities.find(entity => entity.id === id);
};

export const useBlog = () => {
  const blogs = useBlogs();
  return useEntitityById(blogs);
};