import { Box, Hidden } from "@mui/material";
import Header from "./Header";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { DashboardApi } from "../../services/dashboardApi";
import { CommonContext } from "../../store/context/commonContextProvider";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { useRouter } from "next/router";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 265,
    }),
  })
);

const DashBoardPageLayout = ({ children }) => {
  const { isMobile, setIsLoading } = CommonContext();
  const router = useRouter();
  const param = router.pathname;

  const [openDrawer, setOpenDrawer] = useState(true);

  useEffect(() => {
    if (!isMobile) {
      setOpenDrawer(true);
    } else {
      setOpenDrawer(false);
    }
  }, [isMobile]);

  useEffect(() => {
    setIsLoading(true);
  }, [param]);

  useEffect(() => {
    const fetchConnections = () => {
      DashboardApi.checkstatus(
        (res) => {
          // console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    };

    fetchConnections();

    const intervalId = setInterval(() => {
      fetchConnections();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{
          backgroundColor: "#f7fbff",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CssBaseline />
        <Header
          setOpenDrawer={setOpenDrawer}
          handleDrawerToggle={handleDrawerToggle}
          openDrawer={openDrawer}
        />
        <Box sx={{ flex: 1, position: "relative" }}>
          <SideBar
            open={openDrawer}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Main
            open={openDrawer}
            className="thinScrollBar"
            sx={
              isMobile
                ? {
                    marginTop: "72px",
                    backgroundColor: "white",
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "calc(97.5vh - 50px)",
                    scrollbarWidth: "thin",
                    scrollbarColor: "auto",
                    padding: "16px",
                    // WebkitOverflowScrolling: "touch",
                  }
                : {
                    padding: "20px",
                    marginTop: "90px",
                    backgroundColor: "#f7fbff",
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "calc(96vh - 50px)",
                    scrollbarWidth: "thin",
                    scrollbarColor: "auto",

                    // WebkitOverflowScrolling: "touch",
                  }
            }
          >
            <Box
              sx={
                isMobile
                  ? { margin: "auto" }
                  : { width: "1120px", margin: "auto" }
              }
            >
              {children}
            </Box>
          </Main>
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default DashBoardPageLayout;
