import { useSelector } from 'react-redux';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from '../pages/Dashboard';
import Error404 from '../pages/Error404';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { userLoggedInSelect } from '../utils/selectors';
import Layout from './Layout';
import Account from '../pages/Account';

/**
 * The main component of the app, including the routing.
 * @component
 * @example
 * return (
 *  <App />
 * )
 */
export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={
          <AnonymousOnly>
            <Login />
          </AnonymousOnly>
        } />
        <Route path='/profile' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path='/account/:id' element={
          <RequireAuth>
            <Account />
          </RequireAuth>
        } />
        <Route path='*' element={<Error404 />} />
      </Route>
    </Routes>
  )
}

/**
 * Check if the user is authenticated or redirect him to the login page.
 * @param {ReactHTMLElement} children 
 * @returns {ReactHTMLElement}
 */
function RequireAuth({ children }) {
  const isAuthenticated = useSelector(userLoggedInSelect) || localStorage.getItem('jwtToken');
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

/**
 * Check if the user is authenticated and redirect him to the profile page instead.
 * @param {ReactHTMLElement} children 
 * @returns {ReactHTMLElement}
 */
function AnonymousOnly({ children }) {
  const isAuthenticated = useSelector(userLoggedInSelect) || localStorage.getItem('jwtToken');

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

AnonymousOnly.propTypes = {
  children: PropTypes.node.isRequired,
};
