import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CATEGORIES } from '../../utils/constants';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-md border-bottom sticky-top">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="Logo" to="/">
          <img src="/assets/Logo_wanderlust.png" alt="Logo" height="110" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="py-2 px-1 category ms-auto">
            <div className="container d-flex justify-content-center gap-4">
              <Link className="text-decoration-none navIcon" to="/listings/category/Nature">
                <i className="fa fa-tree me-1"></i> Nature
              </Link>
              <Link className="text-decoration-none navIcon" to="/listings/category/Urban">
                <i className="fa fa-city me-1"></i> Urban
              </Link>
              <Link className="text-decoration-none navIcon" to="/listings/category/Beach">
                <i className="fa fa-umbrella-beach me-1"></i> Beach
              </Link>
              <Link className="text-decoration-none navIcon" to="/listings/category/Luxury">
                <i className="fa fa-gem me-1"></i> Luxury
              </Link>
              <Link className="text-decoration-none navIcon" to="/listings/category/Other">
                <i className="fa fa-ellipsis-h me-1"></i> Other
              </Link>
            </div>
          </div>

          <ul className="navbar-nav right ms-auto">
            <Link className="nav-link text-decoration-none" to="/listings/new">
              List Your Property
            </Link>
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link btn-primary" to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
