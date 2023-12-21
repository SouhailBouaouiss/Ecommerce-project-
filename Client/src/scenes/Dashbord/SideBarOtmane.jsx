import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Aside/Navbar";
import DrawerHeader from "../../components/Aside/DrawerHeader";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    background: "red",
  },
});

const drawerWidth = 240;

const SideBarOtmane = ({ open, setOpen }) => {
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />

      <Navbar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </Navbar>
      <Drawer
        classes={{ paper: classes.paper }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Button onClick={handleDrawerClose} style={{ color: "black" }}>
            Close
          </Button>
        </DrawerHeader>
        <Divider />

        <div className="sidebar-title flex items-center">
          <div className="sidebar-brand flex">
            <BsCart3 className="icon_header" /> SHOP
          </div>
        </div>

        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <NavLink to={"/home"} href="" className="flex items-center gap-1">
              <BsGrid1X2Fill size={15} className="icon" />{" "}
              <span style={{ fontSize: "14px" }}>Dashboard</span>
            </NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink to={"/user"} href="" className="flex items-center gap-1">
              <BsGrid1X2Fill size={15} className="icon" />{" "}
              <span style={{ fontSize: "14px" }}>Users</span>
            </NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink to="/product" className="flex items-center gap-1">
              <BsFillArchiveFill size={15} className="icon" />{" "}
              <span style={{ fontSize: "14px" }}>Products</span>
            </NavLink>
          </li>

          <li className="sidebar-list-item">
            <NavLink to="/customer" className="flex items-center gap-1">
              <BsPeopleFill size={15} className="icon" />{" "}
              <span style={{ fontSize: "14px" }}>Customers</span>
            </NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink to="/order" className="flex items-center gap-1">
              <BsListCheck size={15} className="icon" />{" "}
              <span style={{ fontSize: "14px" }}>Orders</span>
            </NavLink>
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export default SideBarOtmane;
