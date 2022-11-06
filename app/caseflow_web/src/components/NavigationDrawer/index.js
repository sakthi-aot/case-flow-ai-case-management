import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // justifyContent: "flex-cen",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const routes = [
    {
      key: 1,
      text: "Home",
      path: "/private/dashboard",
    },
    { key: 2, text: "Tasks", path: "/private/dashboard/tasks" },
    { key: 3, text: "Cases", path: "/private/dashboard/cases" },
    { key: 4, text: "Documents", path: "/private/dashboard/documents" },
    { key: 5, text: "LOB", path: "/private/dashboard/lob" },
  ];
  const { pathname } = useLocation();
  console.log(pathname);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const getLogo = (index) => {
    switch (index) {
      case 0:
        return <HomeOutlinedIcon />;
        break;
      case 1:
        return <AssignmentOutlinedIcon />;
        break;
      case 2:
        return <CasesOutlinedIcon />;
        break;
      case 3:
        return <ArticleOutlinedIcon />;
        break;
      case 4:
        return <BusinessOutlinedIcon />;
        break;
      default:
        return <HomeOutlinedIcon />;
    }
  };

  return (
    <Box>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader style={{ display: "flaex" }}>
          <AccountCircleIcon
            sx={{ fontSize: 30, left: "20px", right: "10px" }}
          />
          <label style={{ fontSize: open ? "18px" : "0px", left: 0 }}>
            Firstname Lastname
          </label>
          {open ? (
            <ChevronLeftIcon
              style={{
                top: "31px",
                // left: !open ? "50px" : "260px",
                marginLeft: "auto",
                fontSize: "30px",
              }}
              onClick={handleDrawerToggle}
            />
          ) : (
            <ChevronRightIcon
              style={{
                top: "31px",
                // left: !open ? "50px" : "260px",

                marginLeft: "auto",

                fontSize: "30px",
              }}
              onClick={handleDrawerToggle}
            />
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((route, index) => (
            <Link
              to={route.path}
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              <ListItem
                key={index}
                selected={route.path === pathname}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 55,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {getLogo(index)}
                  </ListItemIcon>
                  <ListItemText
                    primary={route.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
