import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';
import {useAuthUser} from '../hooks/userAuthUser';
import ThemeSelector from './ThemeSelector';
import useLogout from '../hooks/useLogout';
import { useThemeStore } from "../store/useThemeStore";
const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
const {theme} = useThemeStore


const {logoutMutation} = useLogout();

  return (
    <nav data-theme={theme} className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center" >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        {isChatPage && (
          <div className="pl-5">
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Kasumi
              </span>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <Link to="/notification">
            <button className="btn btn-ghost btn-circle">
              <BellIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </Link>

          <ThemeSelector />

        <div className="avatar">
  <div className="w-9 rounded-full overflow-hidden border border-base-300">
    <img
      src={authUser?.profilePic || '/default-avatar.png'}
      alt="User avatar"
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
    />
  </div>
</div>


          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
