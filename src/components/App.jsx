import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Error404 from '../pages/Error404';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Layout from './Layout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Dashboard />} />
        <Route path='*' element={<Error404 />} />
      </Route>
    </Routes>
  )
}

export default App;
