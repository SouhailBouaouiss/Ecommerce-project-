import React, { useContext } from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
  BsCart3,
} from "react-icons/bs";
import TextField from "@mui/material/TextField";

import { UserContext } from "../../../../contexts/AuthContext";
import AccountMenu from "../avatar/DropDown";

function Header({ OpenSidebar }) {
  const user = useContext(UserContext);
  console.log(user);
  const { first_name, last_name, role } = user.user.data;
  return (
    <header
      className="header"
      style={{ backgroundColor: "rgb(25 28 36 / 95%)" }}
    >
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>

      <div className="header-left">
        <div className="sidebar-brand flex">
          <BsCart3 className="icon_header" /> SHOP
        </div>
      </div>
      <div>
        <TextField
          variant="standard"
          placeholder="Search"
          id="search-input"
          size="small"
          focused
          sx={{ input: { color: "white" } }}
        />
      </div>

      <div className="flex gap-1 items-center">
        <div className="header-right flex gap-5">
          <BsFillBellFill className="icon" />
          <BsFillEnvelopeFill className="icon" />
        </div>
        <AccountMenu name={first_name} />
      </div>
    </header>
  );
}

export default Header;
