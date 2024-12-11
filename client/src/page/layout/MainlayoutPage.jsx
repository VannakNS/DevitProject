import React, { useState, useEffect } from "react";

//icon
import {
  FaHome,
  FaUserFriends,
  FaFolder,
  FaCalendar,
  FaFileAlt,
  FaChartPie,
  FaCog,
  FaBars,
  FaBell,
  FaTimes,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { RiUserLine } from "react-icons/ri";
import {
  MdOutlineSecurity,
  MdOutlineLiveHelp,
  MdOutlineLanguage,
} from "react-icons/md";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, activeItem, setActiveItem }) => {
  const [expanded, setExpanded] = useState({});
  const location = useLocation();

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/" },
    { icon: <FaFolder />, label: "Contact", path: "/contact" },
    { icon: <FaCalendar />, label: "About", path: "/about" },
    { icon: <FaFileAlt />, label: "Blog", path: "/blog" },
   
  ];

  const toggleExpand = (label) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div
      className={`${
        isOpen ? "sticky" : "hidden"
      } lg:block w-64 bg-gray-900 text-gray-200 lg:relative flex flex-col z-50`}>
      <div className="flex items-center justify-between p-4 text-lg font-bold text-white">
        <span>Logo</span>
        <button onClick={toggleSidebar} className="lg:hidden text-gray-400">
          <FaTimes />
        </button>
      </div>
      <nav className="flex flex-col gap-3 p-4">
        {menuItems.map((item) => (
          <div key={item.label}>
            <Link
              to={item.path}
              onClick={() => {
                if (!item.children) setActiveItem(item.label);
                toggleExpand(item.label);
              }}
              className={`flex items-center gap-3 hover:bg-gray-700 p-2 rounded ${
                activeItem === item.label ? "bg-gray-700" : ""
              }`}>
              {item.icon} {item.label}
              {item.children && (
                expanded[item.label] ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />
              )}
            </Link>
            {item.children && expanded[item.label] && (
              <div className="pl-8 flex flex-col gap-3 mt-2">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    to={child.path}
                    onClick={() => setActiveItem(child.label)}
                    className={`hover:bg-gray-700 p-2 rounded ${
                      location.pathname === child.path ? "bg-gray-700" : ""
                    }`}>
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t border-gray-700">
        <Link
          to="/settings"
          onClick={() => setActiveItem("Settings")}
          className={`flex items-center gap-3 hover:bg-gray-700 p-2 rounded ${
            activeItem === "Settings" ? "bg-gray-700" : ""
          }`}>
          <FaCog /> Settings
        </Link>
      </div>
    </div>
  );
};

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = { Username: "Vannak", RoleName: "Admin" }; // Example user data

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="w-full flex justify-between items-center bg-white p-4 relative">
      <button onClick={toggleSidebar} className="text-gray-600 lg:hidden">
        {isSidebarOpen ? "" : <FaBars />}
      </button>
      <div className="flex flex-grow lg:justify-start">
        <div className="flex items-center flex-grow lg:justify-start rounded p-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full lg:w-1/3 outline-none border-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-600">
          <FaBell />
        </button>
        <div className="h-[27px] bg-gray-300 w-[1px]"></div>
        <div
          className="2xl:h-[50px] 2xl:w-[50px] xl:w-[40px] xl:h-[40px] h-[35px] w-[35px] bg-black rounded-full bg-contain bg-center relative cursor-pointer"
          
          onClick={toggleDropdown}></div>
        <span className="hidden font-medium lg:flex">{user?.Username}</span>
      </div>

      {showDropdown && (
        <div
          className="absolute top-full right-[20px] z-10 mt-2 bg-white shadow-md border rounded-md"
          style={{ width: "300px", padding: "10px" }}>
          <div className="border-b-[1px] text-[17px] border-gray-400 mx-auto pb-2">
            <p className="mb-2">
              Username:{" "}
              <span className="font-bold text-[20px]">{user?.Username}</span>
            </p>
            <p>
              Your role:{" "}
              <span className="font-bold text-[20px]">{user?.RoleName}</span>
            </p>
          </div>

          <ul className="mt-[10px] text-[17px] font-sans font-normal leading-[55px]">
            <div className="border-b-[1px] border-gray-400 pb-[20px]">
              <li className="px-4 hover:bg-gray-200 rounded-[8px] flex items-center gap-2">
                <RiUserLine />
                <a href="#" className="block">
                  Account Information
                </a>
              </li>
              <li className="px-4 hover:bg-gray-200 rounded-[8px] flex items-center gap-2">
                <MdOutlineSecurity />
                <a href="#" className="block">
                  Security
                </a>
              </li>
              <li className="px-4 hover:bg-gray-200 rounded-[8px] flex items-center gap-2">
                <MdOutlineLiveHelp />
                <a href="#" className="block">
                  Help
                </a>
              </li>
              <li className="px-4 hover:bg-gray-200 rounded-[8px] flex items-center gap-2">
                <MdOutlineLanguage />
                <a href="#" className="block">
                  Language (English)
                </a>
              </li>
            </div>
            <div className="mt-[10px] flex justify-center w-full pb-[10px]">
              <li className="px-4 w-full text-center hover:bg-gray-100 rounded-[8px] text-blue-700 font-medium border-2 leading-[50px]">
                <a className="block">Logout</a>
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

const Content = () => (
  <div className="w-[90%] mx-auto mt-[30px] bg-white rounded-sm">
    <Outlet />
  </div>
);

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Load active item from localStorage on mount
  useEffect(() => {
    const storedActiveItem = localStorage.getItem("activeItem");
    if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    }
  }, []);

  // Store active item in localStorage whenever it changes
  useEffect(() => {
    if (activeItem) {
      localStorage.setItem("activeItem", activeItem);
    }
  }, [activeItem]);

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className="flex flex-col w-full">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-grow bg-gray-100 min-h-screen">
          <Content />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
