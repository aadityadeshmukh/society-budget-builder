import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings, Calculator, FileText, UserCircle, Menu } from 'lucide-react';
import { useMaintenance } from '../../context/MaintenanceContext';

const Sidebar = () => {
  const { societyName } = useMaintenance();
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Society Structure', path: '/admin/configurator', icon: Settings },
    { name: 'Expenses & Budget', path: '/admin/expense-mapper', icon: Calculator },
    { name: 'Civic Ledger', path: '/admin/ledger', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-white h-screen sticky top-0 flex flex-col pt-8 shadow-2xl z-20">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
          <span className="font-black text-xl text-white">L</span>
        </div>
        <div>
            <h1 className="text-lg font-manrope font-black tracking-tight leading-none text-white">The Ledger</h1>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">v3.0 Premium</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-4 rounded-2xl transition-all ${
                isActive 
                  ? 'bg-teal-600 text-white shadow-xl shadow-teal-900/40' 
                  : 'text-slate-200/60 hover:bg-slate-900 hover:text-white group'
              }`
            }
          >
            <item.icon size={20} className="transition-transform group-hover:scale-110" />
            <span className="font-black text-sm uppercase tracking-tighter">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-900">
        <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-slate-900/50 text-slate-300">
          <UserCircle size={20} className="text-teal-500" />
          <div className="flex flex-col">
            <span className="font-black text-xs uppercase tracking-widest">{societyName.split(' ')[0]} Admin</span>
            <span className="text-[10px] text-slate-500 font-bold italic">Primary Controller</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Header = () => {
  const { societyName, societyLocation } = useMaintenance();
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-md lg:hidden">
          <Menu size={20} />
        </button>
        <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-0.5">Economic Cycle</span>
            <span className="text-sm font-bold text-slate-700">Financial Year 2026-27</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <h2 className="text-xl font-manrope font-black text-slate-900 italic tracking-tight">{societyName}</h2>
          <span className="text-[10px] text-teal-600 uppercase font-black tracking-widest">{societyLocation}</span>
        </div>
        <div className="w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-br from-teal-400 to-indigo-600 shadow-lg shadow-teal-500/20">
           <div className="w-full h-full bg-white rounded-[0.875rem] flex items-center justify-center text-slate-900 font-black tracking-tighter text-lg">
             {societyName.substring(0, 2).toUpperCase()}
           </div>
        </div>
      </div>
    </header>
  );
};

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-cream-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
