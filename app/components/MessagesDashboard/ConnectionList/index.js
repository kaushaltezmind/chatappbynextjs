import { Avatar, Box, Typography } from "@mui/material";
import { useState } from "react";
import { USER_NAME } from "../../../constants/page";
import { MesssagesApi } from "../../../services/messagesApi";
import { CommonContext } from "../../../store/context/commonContextProvider";
import { useRouter } from "next/router";

const ConnectionList = ({
  user,
  setActive,
  setuserDetail,
  setShowMessage,
  i,
  active,
  setSearch,
}) => {
  const [toggle, setToggle] = useState(true);
  const router = useRouter();
  const param = router.pathname;

  const { isMobile, setIsMessageDashboard, setIsShowMessages, setIsProfile } =
    CommonContext();

  const dateTime = user.time;
  const [date, time] = dateTime.split(" ");

  const currentDate = new Date();
  const isToday = date === currentDate.toISOString().split("T")[0];

  const [hours, minutes, seconds] = time.split(":");

  const formattedTime = isToday
    ? `${parseInt(hours, 10) % 12 || 12}:${minutes}${
        parseInt(hours, 10) >= 12 ? "PM" : "AM"
      }`
    : time;

  const providedDate = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const formattedDate =
    providedDate.toISOString().split("T")[0] ===
    yesterday.toISOString().split("T")[0]
      ? "Yesterday"
      : providedDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        });

  const handleNewMessage = (messageid) => {
    MesssagesApi.newMessage(
      messageid,
      (res) => {
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <Box
      key={i}
      sx={
        isMobile
          ? {
              display: "flex",
              padding: "16px",
              gap: "10px",
              alignItems: "flex-start",
              borderBottom: "1px solid #E5E7EB",
              cursor: "pointer",
              backgroundColor: "white",
            }
          : active === i ||
            param.connection === user.receiver ||
            param.connection === user.sender
          ? {
              display: "flex",
              padding: "16px",
              gap: "10px",
              alignItems: "flex-start",
              borderBottom: "1px solid #E5E7EB",
              cursor: "pointer",
              backgroundColor: "#F5F5F6",
            }
          : {
              display: "flex",
              padding: "16px",
              gap: "10px",
              alignItems: "flex-start",
              borderBottom: "1px solid #E5E7EB",
              cursor: "pointer",
              backgroundColor: "white",
            }
      }
      onClick={() => {
        setSearch("");
        setActive(i);
        setuserDetail(user);
        setShowMessage(true);
        setToggle(false);
        handleNewMessage(user.message_id);

        if (isMobile) {
          setIsMessageDashboard(false);
          setIsShowMessages(true);
          setIsProfile(false);
        }

        if (user.sender !== localStorage.getItem(USER_NAME)) {
          router.push(`/messages/${user.sender}`);
        } else {
          router.push(`/messages/${user.receiver}`);
        }
      }}
    >
      <Box>
        <Avatar
          alt="Remy Sharp"
          src={
            (user.sender !== localStorage.getItem(USER_NAME) &&
              user.sender === "Kaushal") ||
            (user.receiver !== localStorage.getItem(USER_NAME) &&
              user.receiver === "Kaushal")
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MbzLVrpxVHJaPIUx3QTIKpUaaYlzkpbo_A&usqp=CAU"
              : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
          }
          sx={{ width: 40 }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            {user.sender !== localStorage.getItem(USER_NAME)
              ? user.sender
              : user.receiver}
          </Typography>
          {isToday ? (
            <Typography sx={{ fontSize: "12px", color: "#85878A" }}>
              {formattedTime}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: "12px", color: "#85878A" }}>
              {formattedDate}
            </Typography>
          )}
        </Box>
        {user.first_message &&
          user.new_message &&
          user.sender !== localStorage.getItem(USER_NAME) &&
          toggle === true && (
            <Box
              sx={{
                fontSize: "12px",
                backgroundColor: "#1B1B1B",
                borderRadius: "10px",
                width: "72px",
                height: "20px",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              New Chat
            </Box>
          )}

        {(user.first_message &&
          user.new_message &&
          user.sender !== localStorage.getItem(USER_NAME) &&
          toggle === true) ||
        (user.new_message &&
          user.sender !== localStorage.getItem(USER_NAME)) ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                color: "#85878A",
                width: "205px",
                whiteSpace: "nowrap",
                overflow: "hidden ",
                textOverflow: "ellipsis !important",
              }}
            >
              {user.message}
            </Typography>

            <Box
              sx={{
                fontSize: "12px",
                backgroundColor: "#0064D9",
                borderRadius: "50%",
                width: "21px",
                height: "21px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              1
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                color: "#85878A",
                width: "238px",
                whiteSpace: "nowrap",
                overflow: "hidden ",
                textOverflow: "ellipsis !important",
              }}
            >
              {user.message}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ConnectionList;
