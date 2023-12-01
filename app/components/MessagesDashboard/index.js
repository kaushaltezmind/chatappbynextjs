import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { MesssagesApi } from "../../services/messagesApi";
import ConnectionList from "./ConnectionList";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import NewUserList from "./NewUserList";
import { CommonContext } from "../../store/context/commonContextProvider";
import { useRouter } from "next/router";

const drawerWidth = 327;

const MessagesDashboard = ({
  open,
  setShowMessage,
  showMessage,
  setuserDetail,
  connections,
  setConnections,
  check,
  setCheck,
  active1,
  setActive1,
  newUserData,
  setNewUserData,
  newChat,
  setNewChat,
  active,
  setActive,
}) => {
  const router = useRouter();
  // const [connections, setConnections] = useState([]);
  const { isMobile, isMessagesDashboard, setIsMessageDashboard } =
    CommonContext();
  const [search, setSearch] = useState("");

  const param = router.pathname;

  useEffect(() => {
    const fetchConnections = () => {
      MesssagesApi.getAllConnections(
        (res) => {
          let data = res.data.data.reverse();
          setConnections(data);
        },
        (err) => {
          console.log(err);
        },
        search
      );
    };

    fetchConnections();

    // const intervalId = setInterval(() => {
    //   fetchConnections();
    // }, 1000);

    // return () => clearInterval(intervalId);
  }, [newChat, check, search, param.connection]);

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
    <Box
      sx={
        isMobile
          ? {
              borderRadius: "18px",
              border: "1px solid #E5E7EB",
              textAlign: "left",
              overflow: "hidden",
              height: "calc(100vh - 146px)",
            }
          : {
              width: "327px",
              borderRadius: "18px",
              border: "1px solid #E5E7EB",
              height: "647px",
              textAlign: "left",
              overflow: "hidden",
            }
      }
    >
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {!isMobile && newChat ? (
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
            />{" "}
            New Chat
          </Typography>
        ) : (
          !isMobile && (
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
        <Box
          sx={
            isMobile && connections.length === 0 && !newChat
              ? { display: "none" }
              : { display: "flex" }
          }
        >
          <Paper
            component="form"
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 42,
              borderRadius: "6px",
              border: "1px solid #C5C5C7",
              justifyContent: "space-between",
              paddingLeft: "13px",
            }}
          >
            <InputBase
              sx={{
                fontSize: "15px",
              }}
              placeholder="Search"
              inputProps={{ "aria-label": "Search Customer" }}
              value={search}
              onInput={(e) => {
                setSearch(e.target.value);
              }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Box>
      {isMobile && connections.length === 0 && !newChat ? (
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
        <Box
          className="thinScrollBar"
          sx={
            isMobile
              ? {
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  overflowX: "hidden",
                  height: "calc(100vh - 220px)",
                  scrollbarWidth: "thin",
                  scrollbarColor: "auto",
                }
              : {
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  overflowX: "hidden",
                  height: "515px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "auto",
                }
          }
        >
          {newChat
            ? newUserData?.map((user, i) => {
                return (
                  <NewUserList
                    key={i}
                    user={user}
                    setActive1={setActive1}
                    setuserDetail={setuserDetail}
                    setShowMessage={setShowMessage}
                    i={i}
                    active1={active1}
                  />
                );
              })
            : connections?.map((user, i) => {
                return (
                  <ConnectionList
                    key={i}
                    user={user}
                    setActive={setActive}
                    setuserDetail={setuserDetail}
                    setShowMessage={setShowMessage}
                    i={i}
                    active={active}
                    setSearch={setSearch}
                  />
                );
              })}
        </Box>
      )}
    </Box>
  );
};

export default MessagesDashboard;
