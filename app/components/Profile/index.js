import { Avatar, Box, Divider, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useEffect, useState } from "react";
import { MesssagesApi } from "../../services/messagesApi";
import { CommonContext } from "../../store/context/commonContextProvider";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter } from "next/router";

const Profile = ({ open, openDrawer2, setOpenDrawer2 }) => {
  const {
    isMobile,
    setIsMessageDashboard,
    setIsShowMessages,
    setIsProfile,
    isLoading,
    setIsLoading,
  } = CommonContext();
  const [detail, setDetail] = useState({});
  const router = useRouter();
  const param = router.query;
  useEffect(() => {
    MesssagesApi.getConnectionInfo(
      param.connection,
      (res) => {
        setDetail(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [param]);
  return (
    <Box
      sx={
        isMobile
          ? {
              padding: "16px",
              backgroundColor: "#F5F5F6",
              height: "calc(100vh - 104px)",
              borderRadius: "16px",
            }
          : {
              width: "252px",
              padding: "16px",
              backgroundColor: "#F5F5F6",
              height: "647px",
              borderRadius: "16px",
            }
      }
    >
      {isMobile && (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            gap: "11px",
            fontsize: "16px",
            fontWeight: 600,
          }}
        >
          <ArrowBackOutlinedIcon
            onClick={() => {
              setIsMessageDashboard(false);
              setIsShowMessages(true);
              setIsProfile(false);
              setOpenDrawer2(!openDrawer2);
              setIsLoading(true);
            }}
            sx={{
              color: "#747579",
              cursor: "pointer",
              width: "24px",
              height: "24px",
            }}
          />
          Profile
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "29px",
          gap: "8px",
        }}
      >
        <Avatar
          src={
            detail?.firstname === "Kaushal"
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MbzLVrpxVHJaPIUx3QTIKpUaaYlzkpbo_A&usqp=CAU"
              : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
          }
          sx={{ width: "86px", height: "86px" }}
          alt=""
        />
        <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
          {detail?.firstname}
        </Typography>
      </Box>
      <Divider sx={{ marginTop: "16px" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          textAlign: "left",
          padding: "16px 0",
        }}
      >
        <Typography sx={{ fontsize: "16px", fontWeight: 600 }}>
          Information
        </Typography>

        {detail?.address && (
          <Typography
            sx={{
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <LocationOnOutlinedIcon />
            {detail?.address}
          </Typography>
        )}
        {detail?.mobilenumber !== 0 && (
          <Typography
            sx={{
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <LocalPhoneOutlinedIcon />
            {detail?.mobilenumber}
          </Typography>
        )}
        {detail?.email && (
          <Typography
            sx={{
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <EmailOutlinedIcon />
            {detail?.email}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
