import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFlash } from '../hooks/useFlash';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, user } = useAuth();
  const { showFlash } = useFlash();
  const navigate = useNavigate();

  if (user) {
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup({ username, email, password });
      navigate('/');
    } catch (error) {
      showFlash(error.response?.data?.error || 'Signup failed', 'error');
    }
  };

  return (
    <div className="login">
      <div className="loginCard">
        <div className="cardHeader">Sign Up to WanderLust</div>
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
            <i className="fa fa-envelope input-icon"></i>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="btn btn-login signup-btn">
            Sign Up
          </button>
        </form>
        <div className="signup-row">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
