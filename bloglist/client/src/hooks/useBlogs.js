import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';

export const useBlogs = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
      );
    },
  });

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    }
  });

  const sortedBlogs = result.data
    ? [...result.data].sort((a, b) => b.likes - a.likes)
    : [];

  return {
    blogs: sortedBlogs,
    isPending: result.isPending,
    addBlog: (blog) => newBlogMutation.mutateAsync(blog),
    updateBlog: (blog) => updateBlogMutation.mutateAsync({ ...blog, likes: blog.likes + 1 }),
    removeBlog: (id) => removeBlogMutation.mutateAsync(id),
  };
};