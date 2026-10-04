import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        <DashboardNavbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


