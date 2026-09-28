const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  await savedBlog.populate('user', { username: 1, name: 1 });

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogRouter.post('/:id/comments', userExtractor, async (req, res) => {
  const { comment } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  if (!comment) {
    return res.status(400).json({ error: 'invalid comment' });
  }

  if (comment.trim().length < 2) {
    return res.status(400).json({ error: 'comment length must be at least 2 characters' });
  }

  const blogToUpdate = await Blog.findById(req.params.id);

  if (!blogToUpdate) {
    return res.status(404).json({ error: `blog with id \`${req.params.id}\` not found` });
  };

  blogToUpdate.comments = blogToUpdate.comments.concat(comment);

  const savedBlog = await blogToUpdate.save();
  await savedBlog.populate('user', { username: 1, name: 1 });

  res.json(savedBlog);
});

blogRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body;
  const blogToUpdate = await Blog.findById(req.params.id);

  if (!blogToUpdate) {
    return res.status(404).json({ error: `blog with id \`${req.params.id}\` not found` });
  }

  blogToUpdate.title = title;
  blogToUpdate.author = author;
  blogToUpdate.url = url;
  blogToUpdate.likes = likes;

  await blogToUpdate.save();
  await blogToUpdate.populate('user', { username: 1, name: 1 });

  res.json(blogToUpdate);
});

blogRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToDelete = await Blog.findById(req.params.id);

  if (!blogToDelete) {
    return res.status(400).json({ error: 'blog not found' });
  }

  if (user.id.toString() !== blogToDelete.user.toString()) {
    return res.status(401).json({ error: 'blog can only be deleted by its creator' });
  }

  await blogToDelete.deleteOne();
  await User.findByIdAndUpdate(user.id, {
    $pull: { blogs: blogToDelete.id }
  });

  res.status(204).end();
});

module.exports = blogRouter;