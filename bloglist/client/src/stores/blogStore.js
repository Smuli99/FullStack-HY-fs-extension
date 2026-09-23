import { create } from 'zustand';
import blogService from '../services/blogs';

const useBlogStore = create(set => ({
  blogs: [],
  actions: {
    initialize: async () => {
      const blogs = await blogService.getAll();
      set(() => ({ blogs }));
    },
    add: async (blog) => {
      const newBlog = await blogService.create(blog);
      set(state => ({ blogs: state.blogs.concat(newBlog) }));
    },
    update: async (blogToUpdate) => {
      const updatedBlog = await blogService.update({
        ...blogToUpdate, likes: blogToUpdate.likes + 1
      });

      set(state => ({
        blogs: state.blogs.map(blog =>
          blog.id !== updatedBlog.id ? blog : updatedBlog
        )
      }));
    },
    remove: async (blogToRemove) => {
      await blogService.remove(blogToRemove);

      set(state => ({
        blogs: state.blogs.filter(blog => blog.id !== blogToRemove.id)
      }));
    },
    addComment: async (blogToUpdate, comment) => {
      const updatedBlog = await blogService.addComment(blogToUpdate.id, comment);
      set(state => ({
        blogs: state.blogs.map(blog =>
          blog.id !== updatedBlog.id ? blog : updatedBlog
        )
      }));
    },
  },
}));

export const useBlogs = () => {
  const blogs = useBlogStore(state => state.blogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return sortedBlogs;
};

export const useBlogActions = () => useBlogStore(state => state.actions);