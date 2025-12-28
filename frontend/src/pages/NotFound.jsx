import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1">404</h1>
      <p className="lead">Page not found!</p>
      <p className="text-muted">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-dark">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
