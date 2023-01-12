import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Error404 from '../pages/Error404';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Layout from './Layout';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={
            <Dashboard />
        } />
        <Route path='*' element={<Error404 />} />
      </Route>
    </Routes>
  )
}

// function RequireAuth({ children }) {
//   let auth = useAuth();
//   // const useSelector = 
//   const location = useLocation();

//   if (!auth.user) {
//     // Redirect them to the /login page, but save the current location they were
//     // trying to go to when they were redirected. This allows us to send them
//     // along to that page after they login, which is a nicer user experience
//     // than dropping them off on the home page.
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// }
