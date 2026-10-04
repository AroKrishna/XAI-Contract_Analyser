import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;


