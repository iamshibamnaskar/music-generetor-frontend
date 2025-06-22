import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.theme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.theme = theme;
  }, [theme]);

  
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div
      className={`relative h-screen transition-all duration-300 flex flex-col justify-between bg-white dark:bg-[#233044] ${collapsed ? 'w-[5rem]' : 'w-[16rem]'
        } shadow-xl p-4`}
    >
      
      <div>
        
        <div className="mb-6 mt-2 flex justify-center md:justify-start items-center">
          <img src={logo} className='w-20' />
          {!collapsed && (
            <h5 className="text-xl font-semibold text-blue-gray-900 dark:text-gray-400">Musio</h5>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-2">
          <div className="flex items-center justify-center px-4 py-2 mt-4 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700  transition" onClick={()=>{
            setTheme(theme === 'dark' ? 'light' : 'dark');
          }}>
            <DarkModeSwitch
              className="text-amber-500 dark:text-gray-100"
              checked={theme === 'dark'}
              onChange={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
            />
          </div>

          <Link to={"/"}>
            <SidebarItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 12L11.2 3.045a1.125 1.125 0 0 1 1.591 0L21.75 12M4.5 9.75V19.875a1.125 1.125 0 0 0 1.125 1.125H9.75V16.125A1.125 1.125 0 0 1 10.875 15h2.25A1.125 1.125 0 0 1 14.25 16.125V21h4.125A1.125 1.125 0 0 0 19.5 19.875V9.75M8.25 21h7.5" />
                </svg>
              }
              label="Home"
              collapsed={collapsed}
            />
          </Link>


          <Link to={"/previous"}>
            <SidebarItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.593 3.322a2.25 2.25 0 0 1 1.907 2.185V21L12 17.25 4.5 21V5.507a2.25 2.25 0 0 1 1.907-2.185 48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
              }
              label="Previous"
              collapsed={collapsed}
            />
          </Link>

          <Link to={"/liked"}>
            <SidebarItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>

              }
              label="Liked"
              collapsed={collapsed}
            />
          </Link>



        </nav>
      </div>

      {/* Bottom section: toggle icon */}
      <div>
        <SidebarItem
          icon={
            collapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )
          }
          label={collapsed ? '' : 'Collapse'}
          collapsed={collapsed}
          onClick={toggleSidebar}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, collapsed, onClick }) => (
  <div
    role="button"
    onClick={onClick}
    className="flex items-center gap-4 p-3 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 cursor-pointer"
  >
    <div className="min-w-[24px]">{icon}</div>
    {!collapsed && <span>{label}</span>}
  </div>
);

export default Sidebar;
