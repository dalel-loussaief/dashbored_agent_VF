import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import {
  MdBuild,
  MdFeedback,
  MdOutlineCategory,
  MdOutlineClose,
  MdOutlineGridView,
  MdOutlineAddHome,
  MdOutlineSearch,
  MdMiscellaneousServices,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";
import { BsFillPersonFill } from 'react-icons/bs';
import { RiArticleFill } from 'react-icons/ri';
import { AiOutlineContacts } from 'react-icons/ai';
import { BiHomeAlt } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";


const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const location = useLocation();
  const isOnFirstPage = location.pathname === "/Login"; 
 
  if (isOnFirstPage) {
    return null; // Ne rien rendre si on est sur la page FirstPage
  } 

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn" // Correction de l'orthographe
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`} 
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">MartVilla</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link active">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/ListRDV" className="menu-link">
                <span className="menu-link-icon">
                <AiOutlineContacts size={20} /> 
                </span>
                <span className="menu-link-text">RDV List </span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/PropertyAdd" className="menu-link">
                <span className="menu-link-icon">
                <MdOutlineAddHome size={20} /> 
                </span>
                <span className="menu-link-text">Add Property</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/Property" className="menu-link">
                <span className="menu-link-icon">
                <MdOutlineAddHome size={20} /> 
                </span>
                <span className="menu-link-text"> Property</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="white-line"></div>
      <div className="menu-item">
        <a href="http://localhost:3000/" className="menu-link">
          <span className="menu-link-icon">
            <IoIosLogOut size={20} style={{ color: "blue" }}/> 
          </span>
          <span className="menu-link-text" style={{ color: "blue" }}>Logout</span>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;
