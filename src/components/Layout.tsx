import { Outlet } from 'react-router-dom';

import Menu from '@/components/Menu';
import ModeToggle from '@/components/ModeToggle';

const Layout = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-4">
      <div className="flex-shrink-0 w-full max-w-screen-xl mx-auto p-4 flex justify-end gap-4">
        <ModeToggle />
        <Menu />
      </div>
      <div className="flex-1 w-full h-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
