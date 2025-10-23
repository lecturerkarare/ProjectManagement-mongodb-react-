import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

import { BsArrowLeftCircle } from 'react-icons/bs';
import { FaFileAlt, FaHome, FaProjectDiagram, FaUserShield } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { isAdmin } from '../utils/util';

const Sidebar: React.FC = () => {
  const isUserAdmin = isAdmin();
  const [open, setOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  const Menus = [
    { title: 'Dasboard', path: '/app', src: <FaHome /> },
    { title: 'Projects', path: '/app/projects', src: <FaProjectDiagram /> },
    ,
  ];

  if (isUserAdmin) {
    Menus.push({ title: 'Users', path: '/app/members', src: <FaUserGroup /> });
    Menus.push({ title: 'Roles', path: '/app/roles', src: <FaUserShield /> });
  }
  Menus.push({ title: 'Documents', path: '/app/documents', src: <FaFileAlt  /> });

  return (
    <>
      <div
        className={`${
          open ? 'w-65' : 'w-fit'
        } sm:block relative h-screen duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}>
        <BsArrowLeftCircle
          className={`${
            !open && 'rotate-180'
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
          onClick={() => setOpen(!open)}
        />
        <Link to="/">
          <div className={`flex ${open && 'gap-x-4'} items-center`}>
            {open && (
              <span className="text-xl font-medium whitespace-nowrap dark:text-white">
                PROJECT MANAGEMENT
              </span>
            )}
          </div>
        </Link>
        
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link to={menu!.path} key={index}>
              <li
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${menu ? 'mt-2' : 'mt-2'} ${
                  location.pathname === menu!.path && 'bg-gray-200 dark:bg-gray-700'
                }`}>
                <span className="text-2xl">{menu!.src}</span>
                <span className={`${!open && 'hidden'} origin-left duration-300 hover:block`}>
                  {menu!.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>

        <div className="pt-6 mt-2">
          <div className="flex flex-col items-start gap-y-2">
            {/* <UserProfile /> */}
          </div>
        </div>
      </div>

      <div className="pt-3"></div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? 'flex' : 'hidden'
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}>
          {Menus.map((menu, index) => (
            <Link to={menu!.path} key={index} onClick={() => setMobileMenu(false)}>
              <span
                className={` ${
                  location.pathname === menu!.path && 'bg-gray-200 dark:bg-gray-700'
                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}>
                {menu!.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
