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
      style={{ width: 260, backgroundColor: "#191c24" }}
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
            <BsGrid1X2Fill className="icon" style={{ color: "#8f5fe8" }} />{" "}
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to={"/user"} href="" className="flex items-center gap-1">
            <BsGrid1X2Fill className="icon" style={{ color: "orange" }} />{" "}
            <span>Users</span>
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/product" className="flex items-center gap-1">
            <BsFillArchiveFill className="icon" style={{ color: "#0090e7" }} />{" "}
            <span>Products</span>
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/customer" className="flex items-center gap-1">
            <BsPeopleFill className="icon" style={{ color: "#00d25b" }} />{" "}
            <span>Customers</span>
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/order" className="flex items-center gap-1">
            <BsListCheck className="icon" style={{ color: "#fc424a" }} />{" "}
            <span>Orders</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
