import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFlash } from '../hooks/useFlash';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();
  const { showFlash } = useFlash();
  const navigate = useNavigate();
  const location = useLocation();

  if (user) {
    navigate('/');
  }

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ username, password });
      navigate(from, { replace: true });
    } catch (error) {
      showFlash(error.response?.data?.error || 'Login failed', 'error');
    }
  };

  return (
    <div className="login">
      <div className="loginCard">
        <div className="cardHeader">Login to WanderLust</div>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="form-group">
            <i className="fa fa-user input-icon"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <i className="fa fa-lock input-icon"></i>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-login">
            Login
          </button>
        </form>
        <div className="signup-row">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
