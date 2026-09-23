import { Link } from 'react-router-dom';
import { useBlogs } from '../../stores/blogStore';
import { useUser } from '../../stores/userStore';

import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Blogs = () => {
  const blogs = useBlogs();
  const user = useUser();

  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
            {user && user.username === blog.user.username && (
              <PersonOutlinedIcon className="icon" fontSize="small" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
