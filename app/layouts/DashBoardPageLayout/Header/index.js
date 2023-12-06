import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CommonContext } from "../../../store/context/commonContextProvider";
import { useRouter } from "next/router";
import { SettingApi } from "@/app/services/settingApi";
import { config } from "@/app/config";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = ({ setOpenDrawer, handleDrawerToggle, openDrawer }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { isMobile, image } = CommonContext();
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = (setting) => {
    if (setting === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("email");

      var usern = localStorage.getItem("username");

      let redirectPathData =
        JSON.parse(localStorage.getItem("pathdetail")) || {};

      redirectPathData[usern] = router.pathname;
      localStorage.setItem("pathdetail", JSON.stringify(redirectPathData));
      router.push("/");
    }
  };

  useEffect(() => {
    SettingApi.getUser(
      (res) => {
        if (res.data.errorCode && res.data.errorCode === 1) {
          if (res.data.errorMessage === "You are not authorised") {
            router.push("/");
            return;
          }
          alert(res.data.errorMessage);
        } else {
          setSelectedImage(config.apiUrl + res.data.data.image);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, [image]);

  return (
    <Box
      sx={
        isMobile
          ? {
              borderBottom: "1px solid #DEE4EA",
              height: "72px",
              padding: "21px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "fixed",
              width: "100%",
              backgroundColor: "#f7fbff",
              zIndex: 1,
            }
          : {
              borderBottom: "1px solid #DEE4EA",
              height: "89.5px",
              padding: "23px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "fixed",
              width: "100%",
              backgroundColor: "#f7fbff",
              zIndex: 1,
            }
      }
    >
      <Box
        sx={
          isMobile
            ? {
                display: "flex",
                justifyContent: "space-between",
                gap: "13px",
              }
            : {
                display: "flex",
                justifyContent: "space-between",
                gap: "91px",
              }
        }
      >
        {isMobile ? (
          <img
            src={"/assets/tezminds_icon.png"}
            alt="logo"
            width={"27px"}
            height={"29px"}
          />
        ) : (
          <img
            src={"/assets/logo.png"}
            alt="logo"
            width={"129px"}
            height={"29px"}
          />
        )}
        <MenuIcon
          sx={{ color: "#000000", cursor: "pointer" }}
          onClick={() => {
            if (isMobile) {
              handleDrawerToggle();
            } else {
              setOpenDrawer(!openDrawer);
            }
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          gap: "24px",
        }}
      >
        <NotificationsNoneIcon
          sx={{
            backgroundColor: "#DEECFB",
            width: "35px",
            height: "35px",
            padding: "8px",
            borderRadius: "8px",
            color: "#000000",
          }}
        />
        <Box
          onClick={handleOpenUserMenu}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            padding: "5px",
            gap: "13px",
            borderRadius: "25px",
            border: "1px solid #E8E8E8",
            width: "92px",
          }}
        >
          <Avatar alt="Profile" sx={{ width: "40px" }} src={selectedImage} />
          <SettingsOutlinedIcon
            sx={{ color: "#BFC0C2", width: "20px", cursor: "pointer" }}
          />
        </Box>
        <Menu
          sx={{ mt: "50px" }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography
                textAlign="center"
                onClick={() => {
                  handleLogout(setting);
                }}
              >
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
