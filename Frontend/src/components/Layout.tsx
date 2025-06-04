import React from 'react';
import clsx from 'clsx';

interface LayoutProps {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
  darkMode: boolean;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, topbar, children, darkMode }) => (
  <div className={clsx({ dark: darkMode })}>
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 text-black dark:text-white">
      {sidebar}
      <div className="flex-1 flex flex-col">
        {topbar}
        <main className="p-6 space-y-6">{children}</main>
      </div>
    </div>
  </div>
);

export default Layout;