import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
      style={{ width: 260, backgroundColor: "#0b2f3a94" }}
    >
      <div className="sidebar-title flex items-center">
        <div className="sidebar-brand flex">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <NavLink to={"/home"} href="" className="flex items-center gap-1">
            <BsGrid1X2Fill className="icon" /> <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to={"/users"} href="" className="flex items-center gap-1">
            <BsGrid1X2Fill className="icon" /> <span>Users</span>
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/product" className="flex items-center gap-1">
            <BsFillArchiveFill className="icon" /> <span>Products</span>
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <a href="" className="flex items-center gap-1">
            <NavLink to="/customer" className="flex items-center gap-1">
              <BsPeopleFill className="icon" /> <span>Customers</span>
            </NavLink>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="" className="flex items-center gap-1">
            <NavLink to="/order" className="flex items-center gap-1">
              <BsListCheck className="icon" /> <span>Orders</span>
            </NavLink>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="" className="flex items-center gap-1">
            <BsMenuButtonWideFill className="icon" /> <span>Reports</span>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="" className="flex items-center gap-1">
            <BsFillGearFill className="icon" /> <span>Setting</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
