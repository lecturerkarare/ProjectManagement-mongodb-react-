import { ReactNode } from 'react';
import React from 'react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="flex flex-auto h-screen">
        <Navbar />
        <Sidebar />
        <div className="grow">
          <div className="m-5 " style={{ marginTop: 70 }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
