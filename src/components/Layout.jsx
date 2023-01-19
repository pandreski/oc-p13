import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

/**
 * Page's layout including routing capability.
 * @component
 * @example
 * return (
 *  <Layout />
 * )
 */
function Layout() {
  return (
    <div className="layoutWrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
