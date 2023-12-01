import { Avatar, Box, Typography } from "@mui/material";
import { USER_NAME } from "../../../constants/page";
import { CommonContext } from "../../../store/context/commonContextProvider";
import { useRouter } from "next/router";

const NewUserList = ({
  user,
  setActive1,
  setuserDetail,
  setShowMessage,
  i,
  active1,
}) => {
  const { isMobile, setIsMessageDashboard, setIsShowMessages, setIsProfile } =
    CommonContext();
  const router = useRouter();
  const param = router.pathname;
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
          : active1 === i || param.connection === user.firstname
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
            }
      }
      onClick={() => {
        setActive1(i);
        setuserDetail(user);
        setShowMessage(true);
        router.push(`/messages/${user.firstname}`);

        if (isMobile) {
          setIsMessageDashboard(false);
          setIsShowMessages(true);
          setIsProfile(false);
        }
      }}
    >
      <Box>
        <Avatar
          alt="Remy Sharp"
          src={
            user.firstname === "Kaushal"
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
            {localStorage.getItem(USER_NAME) === user.firstname
              ? `${user.firstname} (You)`
              : user.firstname}
          </Typography>
        </Box>

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
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default NewUserList;
