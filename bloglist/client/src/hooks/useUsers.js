import { useQuery } from '@tanstack/react-query';
import userService from '../services/users';

export const useUsers = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  });

  const sortedUsers = result.data
    ? [...result.data].sort((a, b) => b.blogs.length - a.blogs.length)
    : [];

  return ({
    users: sortedUsers,
    isPending: result.isPending,
  });
};