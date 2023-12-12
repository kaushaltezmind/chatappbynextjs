import {
  Avatar,
  Box,
  Button,
  Divider,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { MesssagesApi } from "../../services/messagesApi";
import Chats from "./Chats";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ComputerIcon from "@mui/icons-material/Computer";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EmojiPicker from "emoji-picker-react";
import { CommonContext } from "../../store/context/commonContextProvider";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/router";

const settings = [
  { icon: <ComputerIcon sx={{ color: "#747579" }} />, title: "From Computer" },
  {
    icon: <CollectionsOutlinedIcon sx={{ color: "#747579" }} />,
    title: "From File Manager",
  },
];

const arr = [0, 0, 0, 0];

let file = {};

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
      marginLeft: 0,
    }),
  })
);

const ShowMessages = ({
  setOpenDrawer,
  openDrawer,
  setOpenDrawer2,
  openDrawer2,
  connections,
  setConnections,
  check,
  setCheck,
  message,
  setMessage,
  selectedFiles,
  setSelectedFiles,
}) => {
  const router = useRouter();
  const {
    isMobile,
    setIsMessageDashboard,
    setIsShowMessages,
    setIsProfile,
    isLoading,
    setIsLoading,
  } = CommonContext();
  const param = router.query;

  const [chatHistory, setChatHistory] = useState([]);
  const [fullMessage, setFullMessage] = useState("");
  const [isReply, setIsReply] = useState({
    flag: false,
    user: {},
    time: "",
  });
  const [connectionDetail, setConnectionDetail] = useState({
    active: false,
    lastseen: "",
  });

  const [emoji, setEmoji] = useState("");

  const onEmojiClick = (event) => {
    console.log("msg : ", message);
    setMessage(event.emoji);
  };

  useEffect(() => {
    MesssagesApi.getConnectionInfo(
      param.connection,
      (res) => {
        const data = res.data.data;

        const statusTime = new Date(res.data.data.status);
        const currentTime = new Date();

        const timeDifference = (currentTime - statusTime) / 1000;

        if (timeDifference <= 60) {
          setConnectionDetail({ active: true, lastseen: "" });
        } else {
          const dateTime = data.status;
          const [date, time] = dateTime.split(" ");

          const currentDate = new Date();
          let isToday = date === currentDate.toISOString().split("T")[0];

          if (isToday) {
            const [hours, minutes, seconds] = time.split(":");

            let formattedTime = isToday
              ? `${parseInt(hours, 10) % 12 || 12}:${minutes}${
                  parseInt(hours, 10) >= 12 ? "PM" : "AM"
                }`
              : time;
            setConnectionDetail({ active: false, lastseen: formattedTime });
          } else {
            const providedDate = new Date(date);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            let formattedDate =
              providedDate.toISOString().split("T")[0] ===
              yesterday.toISOString().split("T")[0]
                ? "yesterday"
                : providedDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  });
            setConnectionDetail({ active: false, lastseen: formattedDate });
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, [param.connection]);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElUser1, setAnchorElUser1] = useState(null);
  const handleOpenUserMenu1 = (event) => {
    setAnchorElUser1(event.currentTarget);
  };
  const handleCloseUserMenu1 = () => {
    setAnchorElUser1(null);
  };

  useEffect(() => {
    const fetchConnectionMessages = () => {
      MesssagesApi.getConnectionMessages(
        param.connection,
        (res) => {
          setChatHistory(res.data.data);
          setIsLoading(false);
        },
        (err) => {
          console.log(err);
        }
      );
    };

    fetchConnectionMessages();

    // const intervalId = setInterval(() => {
    //   fetchConnectionMessages();
    // }, 1000);

    // return () => clearInterval(intervalId);
  }, [param, fullMessage, check]);

  const handleSendMessage = () => {
    setCheck(!check);
    if (message !== "") {
      MesssagesApi.sendMessageToConnection(
        {
          receiver: param.connection,
          message: message,
          replyOf: isReply.user.message,
          replyTo: isReply.user.sender,
          messageTime: isReply.time,
          attachments: [],
        },
        (res) => {
          const messageid = res.data;
          setFullMessage(message);

          const formData = new FormData();

          formData.append("file", file);

          MesssagesApi.sendAttachmentToConnection(
            messageid,
            formData,
            (res) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }

    MesssagesApi.getAllConnections(
      (res) => {
        let data = res.data.data.reverse();
        setConnections(data);
      },
      (err) => {
        console.log(err);
      }
    );

    setMessage("");
    MesssagesApi.getConnectionMessages(
      param.connection,
      (res) => {
        console.log("Messg : ", res.data);
        setChatHistory(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );

    setIsReply({ flag: false, user: {}, time: "" });
    setSelectedFiles([]);
  };

  const handleBadgeChange = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedFiles(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const formatChatDate = (dateString) => {
    const currentDate = new Date();
    const chatDate = new Date(dateString);

    if (
      currentDate.getDate() === chatDate.getDate() &&
      currentDate.getMonth() === chatDate.getMonth() &&
      currentDate.getFullYear() === chatDate.getFullYear()
    ) {
      return "Today";
    }

    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    if (
      yesterday.getDate() === chatDate.getDate() &&
      yesterday.getMonth() === chatDate.getMonth() &&
      yesterday.getFullYear() === chatDate.getFullYear()
    ) {
      return "Yesterday";
    }

    return chatDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box sx={{ flex: 1, border: "1px solid #E5E7EB", borderRadius: "18px" }}>
      {router.pathname === "/messages" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "647px",
            width: "100%",
          }}
        >
          <img
            src={"/assets/chat_image.svg"}
            alt="message"
            width={"277px"}
            height={"153px"}
          />{" "}
        </Box>
      ) : (
        <Box
          sx={
            isMobile
              ? {
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "calc(100vh - 104px)",
                }
              : {
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "647px",
                }
          }
        >
          <Box
            sx={{
              padding: "16px",
              borderBottom: "1px solid #E5E7EB",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {isMobile ? (
                <ArrowBackOutlinedIcon
                  onClick={() => {
                    setIsMessageDashboard(true);
                    setIsShowMessages(false);
                    setIsProfile(false);
                    router.push("/messages");
                  }}
                  sx={{
                    color: "#747579",
                    cursor: "pointer",
                    width: "24px",
                    height: "24px",
                  }}
                />
              ) : (
                <MenuIcon
                  sx={{
                    color: "#747579",
                    cursor: "pointer",
                    width: "24px",
                    height: "24px",
                  }}
                  onClick={() => {
                    setOpenDrawer(!openDrawer);
                  }}
                />
              )}
              <Avatar
                alt="Remy Sharp"
                src={
                  param.connection === "Kaushal"
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MbzLVrpxVHJaPIUx3QTIKpUaaYlzkpbo_A&usqp=CAU"
                    : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
                }
                sx={{ width: 42 }}
              />
              <Box
                sx={{
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#1B1B1B",
                    display: "flex",
                    alignContent: "center",
                    gap: "5px",
                    fontWeight: 600,
                  }}
                >
                  {param.connection}
                  <FiberManualRecordIcon
                    sx={
                      connectionDetail.active
                        ? { width: 10, color: "#26C77A" }
                        : { width: 10, color: "#f7a000" }
                    }
                  />
                </Typography>
                {isLoading ? (
                  <Skeleton animation="wave" height={12} width="105px" />
                ) : (
                  <Typography sx={{ fontSize: "12px", color: "#85878A" }}>
                    {connectionDetail.active
                      ? "online"
                      : `Last seen on ${connectionDetail.lastseen}`}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box>
              <InfoOutlinedIcon
                sx={{
                  width: "24px",
                  color: openDrawer2 ? "#0064D9" : "#747579",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (isMobile) {
                    setIsMessageDashboard(false);
                    setIsShowMessages(false);
                    setIsProfile(true);
                  }
                  setOpenDrawer2(!openDrawer2);
                }}
              />
            </Box>
          </Box>

          {isLoading ? (
            <Box
              sx={
                isMobile
                  ? {
                      display: "flex",
                      flexDirection: "column-reverse",
                      height: "calc(100vh - 250px)",
                      width: "100%",
                      gap: "10px",
                    }
                  : {
                      display: "flex",
                      flexDirection: "column-reverse",
                      height: "calc(100vh - 250px)",
                      width: "100%",
                    }
              }
            >
              {arr?.map((item, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                      padding: "16px",
                    }}
                  >
                    <Box>
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        sx={
                          isMobile
                            ? { width: "32px", height: "32px" }
                            : { width: "40px", height: "40px" }
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <Skeleton animation="wave" height={18} width="130px" />
                      <Skeleton animation="wave" height={18} width="250px" />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Main
              className="thinScrollBar"
              open={openDrawer}
              sx={{
                overflow: "scroll",
                overflowY: "auto",
                overflowX: "hidden",
                scrollbarWidth: "thin",
                scrollbarColor: "auto",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {chatHistory === null ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "calc(100vh - 250px)",
                    width: "100%",
                  }}
                >
                  <img
                    src={"/assets/chat_image.svg"}
                    alt="message"
                    width={"241px"}
                    height={"133px"}
                  />
                </Box>
              ) : (
                <Box sx={{ padding: "16px 0 0 0" }}>
                  {chatHistory?.map((message, i) => {
                    const formattedDate = formatChatDate(message.date);
                    return (
                      <Box key={i}>
                        {i == 0 && (
                          <Divider
                            sx={{
                              padding: "0 16px",
                              fontSize: "10px",
                              color: "#85878A",
                              lineHeight: "16px",
                            }}
                          >
                            {formattedDate}
                          </Divider>
                        )}
                        {i > 0 && chatHistory[i - 1].date !== message.date && (
                          <Divider
                            sx={{
                              padding: "0 16px",
                              fontSize: "10px",
                              color: "#85878A",
                              lineHeight: "16px",
                            }}
                          >
                            {formattedDate}
                          </Divider>
                        )}
                        <Chats
                          message={message}
                          key={i}
                          i={i}
                          isReply={isReply}
                          setIsReply={setIsReply}
                        />
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Main>
          )}

          <Box //start from here
            sx={
              isMobile
                ? {
                    display: "flex",
                    alignItem: "center",
                    flexDirection: "row",
                    padding: "16px",
                    gap: "8px",
                    alignItems: "flex-end",
                    borderTop: "1px solid #E5E7EB",
                  }
                : {
                    display: "flex",
                    alignItem: "center",
                    flexDirection: "row",
                    padding: "16px",
                    gap: "16px",
                    alignItems: "flex-end",
                  }
            }
          >
            <Box
              sx={
                isMobile
                  ? {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "16px",
                      height: "42px",
                    }
                  : {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "6px",
                      height: "56px",
                    }
              }
            >
              <Box
                onClick={handleOpenUserMenu}
                sx={
                  isMobile
                    ? {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }
                    : {
                        backgroundColor: "#F5F5F6",
                        color: "black",
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }
                }
              >
                <AttachmentOutlinedIcon sx={{ width: 24, height: 24 }} />
              </Box>
              <Menu
                sx={
                  isMobile
                    ? {
                        mt: "-42px",
                        ml: "-35px",
                        padding: "0px",
                        borderRadius: "4px",
                        "& .MuiPaper-root": {
                          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                        },
                      }
                    : {
                        mt: "-52px",
                        ml: "-42px",
                        padding: "15px",
                        position: "absolute",
                        borderRadius: "4px",
                        "& .MuiPaper-root": {
                          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                        },
                      }
                }
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    onClick={handleCloseUserMenu}
                    sx={
                      isMobile
                        ? {
                            color: "black",
                          }
                        : {
                            width: "186px",
                          }
                    }
                  >
                    <Typography
                      sx={
                        isMobile
                          ? {
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              fontWeight: "600",
                            }
                          : {
                              fontSize: "15px",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              fontWeight: "600",
                            }
                      }
                      textAlign="center"
                      onClick={handleBadgeChange}
                    >
                      {setting.icon} {setting.title}
                    </Typography>
                    <TextField
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </MenuItem>
                ))}
              </Menu>
              <SentimentSatisfiedAltOutlinedIcon
                sx={{ width: 24, height: 24, cursor: "pointer" }}
                onClick={handleOpenUserMenu1}
              />
              <Menu
                sx={{
                  mt: "-52px",
                  ml: "-42px",
                  padding: "15px",
                  position: "absolute",
                  borderRadius: "4px",
                  "& .MuiPaper-root": {
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                  },
                }}
                anchorEl={anchorElUser1}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser1)}
                onClose={handleCloseUserMenu1}
              >
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </Menu>
            </Box>
            {isReply.flag ? (
              <Box
                sx={{
                  flex: 1,
                  border: "1px solid #C5C5C7",
                  borderRadius: "6px",
                }}
              >
                <Box sx={{ padding: "5px 5px 0 5px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px 10px 10px 10px",
                      justifyContent: "flex-start",
                      alignItems: "left",
                      textAlign: "left",
                      gap: "2px",
                      backgroundColor: "#F5F5F6",
                      borderRadius: "6px 6px 6px 0px",
                      borderLeft: "3px solid #0064D9",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "8px",
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            isReply.user.sender === "Kaushal"
                              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MbzLVrpxVHJaPIUx3QTIKpUaaYlzkpbo_A&usqp=CAU"
                              : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          }
                          sx={{ width: 20, height: 20 }}
                        />
                        <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                          {isReply.user.sender}
                        </Typography>
                      </Box>
                      <CloseIcon
                        sx={{ width: "15px", cursor: "pointer" }}
                        onClick={() => {
                          setIsReply({ flag: false, user: {} });
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={
                          isReply
                            ? { color: "#85878A", fontSize: "14px" }
                            : { color: "#85878A" }
                        }
                      >
                        {isReply.user.message}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <InputBase
                  placeholder="Type a Message"
                  sx={
                    isMobile
                      ? {
                          flex: 1,
                          height: "42px",
                          border: "none",
                          padding: "0 16px",
                          borderRadius: "6px",
                          width: "100%",
                          fontSize: "14px",
                        }
                      : {
                          flex: 1,
                          height: "56px",
                          border: "none",
                          padding: "0 16px",
                          borderRadius: "6px",
                          width: "100%",
                        }
                  }
                  value={message}
                  onInput={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  autoFocus
                />
              </Box>
            ) : (
              <InputBase
                placeholder="Type a Message"
                sx={
                  isMobile
                    ? {
                        flex: 1,
                        height: "42px",
                        border: "1px solid #C5C5C7",
                        padding: "0 16px",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }
                    : {
                        flex: 1,
                        height: "56px",
                        border: "1px solid #C5C5C7",
                        padding: "0 16px",
                        borderRadius: "6px",
                      }
                }
                value={message}
                onInput={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                autoFocus
              />
            )}
            <Box
              sx={
                isMobile
                  ? {
                      backgroundColor: "#0064D9",
                      color: "white",
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }
                  : {
                      backgroundColor: "#0064D9",
                      color: "white",
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }
              }
              onClick={handleSendMessage}
            >
              <SendIcon sx={{ width: 24, height: 24 }} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ShowMessages;
