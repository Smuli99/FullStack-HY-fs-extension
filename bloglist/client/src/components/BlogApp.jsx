import Blogs from './Blogs';

const BlogApp = ({ user }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Blogs user={user} />
    </div>
  );
};

export default BlogApp;