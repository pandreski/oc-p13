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

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
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

function RequireAuth({ children }) {
  const isAuthenticated = useSelector(userLoggedInSelect) || localStorage.getItem('jwtToken');
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
