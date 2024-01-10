import React, { useContext } from "react";
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
import BadgeAvatars from "../avatar/Avatar";
import { UserContext } from "../../../../contexts/AuthContext";
import { Typography } from "@mui/material";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const user = useContext(UserContext);
  console.log(user);
  const { first_name, last_name, role } = user.user.data;

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
      style={{ width: 260, backgroundColor: "#191c24" }}
    >
      <div className="sidebar-title flex items-center gap-3">
        <BadgeAvatars name={first_name} />
        <div>
          <p style={{ fontFamily: "Archivo, sans-serif", color: "white" }}>
            {first_name} {last_name}
          </p>
          <p style={{ color: "#6c7293", fontSize: 12 }}>{role}</p>
        </div>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <NavLink to={"/home"} href="" className="flex items-center gap-1">
            <BsGrid1X2Fill
              className="icon"
              style={{ fontSize: 14, color: "#8f5fe8" }}
            />{" "}
            <Typography variant="body2">Dashboard</Typography>
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to={"/user"} href="" className="flex items-center gap-1">
            <BsGrid1X2Fill
              className="icon"
              style={{ fontSize: 14, color: "orange" }}
            />{" "}
            <Typography variant="body2">Users</Typography>
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/product" className="flex items-center gap-1">
            <BsFillArchiveFill
              className="icon"
              style={{ fontSize: 14, color: "#0090e7" }}
            />{" "}
            <Typography variant="body2">Products</Typography>
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/customer" className="flex items-center gap-1">
            <BsPeopleFill
              className="icon"
              style={{ fontSize: 14, color: "#00d25b" }}
            />{" "}
            <Typography variant="body2">Customers</Typography>
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/order" className="flex items-center gap-1">
            <BsListCheck
              className="icon"
              style={{ fontSize: 14, color: "#fc424a" }}
            />{" "}
            <Typography variant="body2">Orders</Typography>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
