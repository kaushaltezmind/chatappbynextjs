import { Box, Typography } from "@mui/material";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import Drawer from "@mui/material/Drawer";
import React from "react";
import {
  ROUTE_DASHBOARD,
  ROUTE_CONTACT_US,
  ROUTE_CUSTOMER_LIST,
  ROUTE_PRICING,
  ROUTE_SETTINGS,
  ROUTE_MESSAGES,
} from "../../../constants/page";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

import ListItemIcon from "@mui/material/ListItemIcon";
import { CommonContext } from "../../../store/context/commonContextProvider";

const drawerWidth = 265;

const iconArray = [
  {
    icon: <SpaceDashboardOutlinedIcon />,
    name: "Dashboard",
    path: ROUTE_DASHBOARD,
  },
  {
    icon: <PeopleAltOutlinedIcon />,
    name: "Customer List",
    path: ROUTE_CUSTOMER_LIST,
  },
  {
    icon: <ForumOutlinedIcon />,
    name: "Messages",
    path: ROUTE_MESSAGES,
  },
  {
    icon: <SettingsOutlinedIcon />,
    name: "Settings",
    path: `${ROUTE_SETTINGS}/personaldetails`,
  },
  {
    icon: <MailOutlineOutlinedIcon />,
    name: "Contact Us",
    path: ROUTE_CONTACT_US,
  },
  {
    icon: <AttachMoneyOutlinedIcon />,
    name: "Pricing",
    path: ROUTE_PRICING,
  },
];

const SideBar = ({ open, window, mobileOpen, handleDrawerToggle }) => {
  const location = useRouter();
  const { isMobile } = CommonContext();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Drawer
      sx={
        isMobile
          ? {
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#F7FBFF",
              },
              "& .MuiBackdrop-root": {
                backgroundColor: "transparent",
              },
            }
          : {
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#F7FBFF",
                marginTop: "90px",
              },
            }
      }
      container={container}
      variant={isMobile ? "temporary" : "persistent"}
      open={isMobile ? mobileOpen : open}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {/* <Divider /> */}
      <Box
        sx={{
          borderRight: "1px solid #DEE4EA",
          width: "265px",
          height: "100%",
          padding: "20px",
          display: "flex",
          gap: "4px",
          flexDirection: "column",
        }}
      >
        {iconArray?.map((item, index) => {
          return (
            <Link
              key={index}
              href={{
                pathname: item.path,
              }}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={
                  location.pathname === item.path
                    ? {
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        gap: "16px",
                        padding: "15px 24px",
                        borderRadius: "8px",
                        backgroundColor: "#deebfb",
                        height: "46px",
                      }
                    : {
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        gap: "16px",
                        padding: "15px 24px",
                        borderRadius: "8px",
                        height: "46px",
                      }
                }
              >
                <ListItemIcon
                  sx={
                    location.pathname === item.path
                      ? {
                          minWidth: "unset",
                          mr: 0.3,
                          color: "#0064D9",
                        }
                      : { minWidth: "unset", mr: 0.3 }
                  }
                >
                  {item.icon}
                </ListItemIcon>
                <Typography
                  sx={
                    location.pathname === item.path
                      ? {
                          color: "#0064D9",
                          fontWeight: "600",
                          fontSize: "14px",
                        }
                      : {
                          color: "black",
                          fontWeight: "600",
                          textDecoration: "none",
                          fontSize: "14px",
                        }
                  }
                >
                  {item.name}
                </Typography>
              </Box>
              {index === 3 && (
                <Divider sx={{ marginTop: "2px", marginBottom: "-2px" }} />
              )}
            </Link>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default SideBar;
