import ModeToggle from '@/components/ModeToggle';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-4">
      <div className="flex-shrink-0 w-full max-w-screen-xl mx-auto p-4 flex justify-end">
        <ModeToggle />
      </div>
      <div className="flex-1 w-full h-full overflow-hidden">{children}</div>
    </div>
  );
};

export default Layout;
