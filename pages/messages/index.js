import { Box, Drawer, Typography, styled } from "@mui/material";
import MessagesDashboard from "../../app/components/MessagesDashboard";
import ShowMessages from "../../app/components/ShowMessages";
import { useEffect, useState } from "react";
import Profile from "../../app/components/Profile";
import { CommonContext } from "../../app/store/context/commonContextProvider";
import { MesssagesApi } from "../../app/services/messagesApi";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DashBoardPageLayout from "@/app/layouts/DashBoardPageLayout";

const drawerWidth = 327;
const drawerWidth2 = 252;

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
    }),
  })
);

const Messages = () => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [openDrawer2, setOpenDrawer2] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [userDetail, setuserDetail] = useState({});
  const [connections, setConnections] = useState([]);
  const { isMobile, isMessagesDashboard, isShowMessages, isProfile } =
    CommonContext();
  const [newUserData, setNewUserData] = useState([]);
  const [newChat, setNewChat] = useState(false);
  const [active1, setActive1] = useState();
  const [active, setActive] = useState();
  const [message, setMessage] = useState("");

  const [check, setCheck] = useState(false);

  useEffect(() => {}, [isProfile, isMessagesDashboard, isShowMessages]);

  const handleNewChat = () => {
    setNewChat(true);
    setActive1(null);
    MesssagesApi.getAllUsers(
      (res) => {
        setNewUserData(res.data.data.records);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <DashBoardPageLayout>
      <Box
        sx={
          isMobile
            ? {
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                borderRadius: "18px",
                backgroundColor: "white",
                position: "relative",
              }
            : {
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                borderRadius: "18px",
                backgroundColor: "white",
                padding: "24px",
                position: "relative",
              }
        }
      >
        <Box
          sx={
            isMobile && isMessagesDashboard
              ? {
                  textAlign: "left",
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }
              : isMobile && !isMessagesDashboard
              ? {
                  textAlign: "left",
                  display: "none",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }
              : { textAlign: "left" }
          }
        >
          <Typography
            sx={
              isMobile
                ? { fontSize: "26px", marginTop: "-5px", fontWeight: "bold" }
                : { fontSize: "36px", fontWeight: "bold" }
            }
          >
            Messages
          </Typography>
          {isMobile && newChat ? (
            <Typography
              sx={{
                display: "flex",
                gap: "10px",
                fontSize: "16px",
                color: "#1B1B1B",
                cursor: "pointer",
                alignItems: "center",
              }}
            >
              <ArrowBackOutlinedIcon
                onClick={() => {
                  setNewChat(false);
                  setActive(null);
                }}
                sx={{
                  width: "16px",
                  height: "16px",
                  color: "#85878A",
                }}
              />
              New Chat
            </Typography>
          ) : (
            isMobile &&
            !newChat && (
              <Typography
                sx={{
                  display: "flex",
                  gap: "3px",
                  fontSize: "15px",
                  color: "#0064D9",
                  cursor: "pointer",
                }}
                onClick={handleNewChat}
              >
                <AddIcon sx={{ width: "14px", marginTop: "-1px" }} /> New Chat
              </Typography>
            )
          )}
        </Box>
        <Box
          sx={
            isMobile
              ? {
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                }
              : {
                  display: "flex",
                  flexDirection: "row",
                  gap: "32px",
                  flex: 1,
                }
          }
        >
          {isMessagesDashboard && isMobile ? (
            <Drawer
              // ModalProps={{
              //   keepMounted: true, // Better open performance on mobile.
              // }}
              sx={
                isMobile
                  ? {
                      flexShrink: 0,
                      transition: "transform 0.5s ease-in-out",
                      transform: openDrawer
                        ? "translateX(0)"
                        : `translateX(1000px)`,
                      "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        position: "relative",
                        border: "none",
                      },
                      display: openDrawer ? "block" : "none",
                    }
                  : {
                      width: drawerWidth,
                      flexShrink: 0,
                      transition: "transform 0.5s ease-in-out",
                      transform: openDrawer
                        ? "translateX(0)"
                        : `translateX(1000px)`,
                      "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        position: "relative",
                        border: "none",
                      },
                      display: openDrawer ? "block" : "none",
                    }
              }
              variant={isMobile ? "permanent" : "permanent"}
              open={openDrawer}
              anchor="left"
            >
              <MessagesDashboard
                open={openDrawer}
                setShowMessage={setShowMessage}
                showMessage={showMessage}
                setuserDetail={setuserDetail}
                connections={connections}
                setConnections={setConnections}
                check={check}
                setCheck={setCheck}
                active1={active1}
                setActive1={setActive1}
                newUserData={newUserData}
                setNewUserData={setNewUserData}
                newChat={newChat}
                setNewChat={setNewChat}
                active={active}
                setActive={setActive}
              />
            </Drawer>
          ) : (
            !isMobile && (
              <Drawer
                // ModalProps={{
                //   keepMounted: true, // Better open performance on mobile.
                // }}
                sx={
                  isMobile
                    ? {
                        flexShrink: 0,
                        transition: "transform 0.5s ease-in-out",
                        transform: openDrawer
                          ? "translateX(0)"
                          : `translateX(1000px)`,
                        "& .MuiDrawer-paper": {
                          boxSizing: "border-box",
                          position: "relative",
                          border: "none",
                        },
                        display: openDrawer ? "block" : "none",
                      }
                    : {
                        width: drawerWidth,
                        flexShrink: 0,
                        transition: "transform 0.5s ease-in-out",
                        transform: openDrawer
                          ? "translateX(0)"
                          : `translateX(1000px)`,
                        "& .MuiDrawer-paper": {
                          width: drawerWidth,
                          boxSizing: "border-box",
                          position: "relative",
                          border: "none",
                        },
                        display: openDrawer ? "block" : "none",
                      }
                }
                variant={isMobile ? "permanent" : "permanent"}
                open={openDrawer}
                anchor="left"
              >
                <MessagesDashboard
                  open={openDrawer}
                  setShowMessage={setShowMessage}
                  showMessage={showMessage}
                  setuserDetail={setuserDetail}
                  connections={connections}
                  setConnections={setConnections}
                  check={check}
                  setCheck={setCheck}
                  active1={active1}
                  setActive1={setActive1}
                  newUserData={newUserData}
                  setNewUserData={setNewUserData}
                  newChat={newChat}
                  setNewChat={setNewChat}
                  active={active}
                  setActive={setActive}
                />
              </Drawer>
            )
          )}
          {isShowMessages && isMobile ? (
            <Main open={openDrawer2}>
              <ShowMessages
                setOpenDrawer={setOpenDrawer}
                openDrawer={openDrawer}
                setOpenDrawer2={setOpenDrawer2}
                openDrawer2={openDrawer2}
                showMessage={showMessage}
                userDetail={userDetail}
                connections={connections}
                setConnections={setConnections}
                check={check}
                setCheck={setCheck}
                message={message}
                setMessage={setMessage}
              />
            </Main>
          ) : (
            !isMobile && (
              <Main open={openDrawer2}>
                <ShowMessages
                  setOpenDrawer={setOpenDrawer}
                  openDrawer={openDrawer}
                  setOpenDrawer2={setOpenDrawer2}
                  openDrawer2={openDrawer2}
                  showMessage={showMessage}
                  userDetail={userDetail}
                  connections={connections}
                  setConnections={setConnections}
                  check={check}
                  setCheck={setCheck}
                  message={message}
                  setMessage={setMessage}
                />
              </Main>
            )
          )}
          {isProfile && isMobile ? (
            <Drawer
              sx={
                isMobile
                  ? {
                      flexShrink: 0,
                      "& .MuiDrawer-paper": {
                        position: "relative",
                        boxSizing: "border-box",
                        border: "none",
                      },
                      display: openDrawer2 ? "block" : "none",
                    }
                  : {
                      width: drawerWidth2,
                      flexShrink: 0,
                      "& .MuiDrawer-paper": {
                        width: drawerWidth2,
                        position: "relative",
                        boxSizing: "border-box",
                        border: "none",
                      },
                      display: openDrawer2 ? "block" : "none",
                    }
              }
              variant="permanent"
              open={openDrawer2}
              anchor="right"
            >
              <Profile
                open={openDrawer2}
                openDrawer2={openDrawer2}
                setOpenDrawer2={setOpenDrawer2}
              />
            </Drawer>
          ) : (
            !isMobile && (
              <Drawer
                sx={
                  isMobile
                    ? {
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                          position: "relative",
                          boxSizing: "border-box",
                          border: "none",
                        },
                        display: openDrawer2 ? "block" : "none",
                      }
                    : {
                        width: drawerWidth2,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                          width: drawerWidth2,
                          position: "relative",
                          boxSizing: "border-box",
                          border: "none",
                        },
                        display: openDrawer2 ? "block" : "none",
                      }
                }
                variant="permanent"
                open={openDrawer2}
                anchor="right"
              >
                <Profile
                  open={openDrawer2}
                  openDrawer2={openDrawer2}
                  setOpenDrawer2={setOpenDrawer2}
                />
              </Drawer>
            )
          )}
        </Box>
      </Box>
    </DashBoardPageLayout>
  );
};

export default Messages;
