import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { CommonContext } from "../../../store/context/commonContextProvider";
import Link from "next/link";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { useState } from "react";

const Chats = ({ message, i, isReply, setIsReply }) => {
  const [tab, setTab] = useState(false);
  const { isMobile } = CommonContext();
  const time = message.time;

  const currentDate = new Date();
  // const isToday = date === currentDate.toISOString().split("T")[0];

  const [hours, minutes, seconds] = time.split(":");

  const formattedTime = `${parseInt(hours, 10) % 12 || 12}:${minutes}${
    parseInt(hours, 10) >= 12 ? "PM" : "AM"
  }`;

  const handleReply = () => {
    setIsReply({ flag: true, user: message, time: formattedTime });
  };

  const handlePreview = (previewUrl) => {
    console.log("Opening preview:", previewUrl);
    window.open(previewUrl, "_blank");
  };

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      {message.replyOf === "" ? (
        <Box
          key={i}
          sx={{
            display: "flex",
            padding: "16px",
            gap: "10px",
            alignItems: "flex-start",
            cursor: "pointer",
          }}
        >
          <Box>
            <Avatar
              alt="Remy Sharp"
              src={
                message.sender === "Kaushal"
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MbzLVrpxVHJaPIUx3QTIKpUaaYlzkpbo_A&usqp=CAU"
                  : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
              }
              sx={
                isMobile ? { width: 32, height: 32 } : { width: 40, height: 40 }
              }
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                "& #hidden-button": {
                  visibility: "hidden",
                },
                "&:hover #hidden-button": {
                  visibility: "visible",
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                  }}
                >
                  <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                    {message.sender}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#85878A" }}>
                    {formattedTime}
                  </Typography>
                </Box>
                <Box
                  id="hidden-button"
                  onClick={handleReply}
                  sx={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F5F5F6",
                    visibility: "hidden",
                  }}
                >
                  <ReplyIcon sx={{ width: "24px", height: "32px" }} />
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{
                    marginTop: "-8px",
                    width: "100%",
                    color: "#85878A",
                    fontSize: "16px",
                  }}
                >
                  {message.message}
                </Typography>
              </Box>
            </Box>
            {message.attachments.length > 0 && (
              <Box>
                {message.attachments.map((item, i) => {
                  return (
                    <Box key={i}>
                      {item.type.includes("application") ? (
                        <Box
                          sx={{
                            width: "100%",
                            height: "56px",
                            border: "1px solid #E5E7EB",
                            borderRadius: "8px",
                            marginTop: "17px",
                            padding: "12px",
                            display: "flex",
                            justifyContent: "space-between",
                            "& #hidden-button-2": {
                              visibility: "hidden",
                            },
                            "&:hover #hidden-button-2": {
                              visibility: "visible",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "9px",
                              alignItems: "center",
                            }}
                            onClick={() => {
                              handlePreview(item.url);
                            }}
                          >
                            <Avatar
                              src="/assets/pdf_icon.png"
                              sx={{ width: 32, height: 32 }}
                            />

                            <Typography
                              sx={{ color: "#85878A", fontSize: "16px" }}
                            >
                              {item.filename}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "10px",
                            }}
                          >
                            <Box
                              id="hidden-button-2"
                              sx={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#F5F5F6",
                                visibility: "hidden",
                              }}
                              onClick={() => {
                                handlePreview(item.url);
                              }}
                            >
                              <GetAppOutlinedIcon
                                sx={{ width: "24px", height: "32px" }}
                              />
                            </Box>

                            <Box
                              id="hidden-button-2"
                              sx={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#F5F5F6",
                                visibility: "hidden",
                              }}
                            >
                              <MoreVertOutlinedIcon
                                sx={{ width: "24px", height: "32px" }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          key={i}
                          sx={{
                            width: "48%",
                            height: "119px",
                            borderRadius: "8px",
                            marginTop: "17px",
                            display: "flex",
                            justifyContent: "right",
                            position: "relative",
                            "& #hidden-button-2": {
                              visibility: "hidden",
                            },
                            "&:hover #hidden-button-2": {
                              visibility: "visible",
                            },
                          }}
                          // onClick={() => {
                          //   handlePreview(item.url);
                          // }}
                        >
                          <img
                            src={item.url}
                            alt="image"
                            width={"100%"}
                            height={"100%"}
                            style={{ borderRadius: "8px" }}
                          />

                          <Box
                            id="hidden-button-2"
                            sx={{
                              position: "absolute",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "10px",
                                padding: "8px",
                                justifyContent: "right",
                              }}
                            >
                              <Box
                                id="hidden-button-2"
                                sx={{
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: "#F5F5F6",
                                  visibility: "hidden",
                                }}
                                onClick={() => {
                                  handlePreview(item.url);
                                }}
                              >
                                <GetAppOutlinedIcon
                                  sx={{ width: "24px", height: "32px" }}
                                />
                              </Box>

                              <Box
                                id="hidden-button-2"
                                sx={{
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: "#F5F5F6",
                                  visibility: "hidden",
                                }}
                                onClick={() => {
                                  setTab(!tab);
                                }}
                              >
                                <MoreVertOutlinedIcon
                                  sx={{ width: "24px", height: "32px" }}
                                />
                              </Box>
                            </Box>
                            {tab && (
                              <Box
                                sx={{
                                  backgroundColor: "white",
                                  padding: "8px",
                                  borderRadius: "4px",
                                  marginTop: "-4px",
                                }}
                              >
                                <Button
                                  variant="outlined"
                                  sx={{
                                    backgroundColor: "rgba(0,100,217,0.17)",
                                    padding: "10px",
                                    height: "40px",
                                    borderRadius: "4px",
                                    fontSize: "15px",
                                  }}
                                  onClick={() => {
                                    handlePreview(item.url);
                                    setTab(false);
                                  }}
                                >
                                  <OpenInNewOutlinedIcon /> Open in new tab
                                </Button>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          key={i}
          sx={{
            padding: "16px",
          }}
        >
          <Box
            sx={{
              border: "1px solid #E5E7EB",
              padding: "9px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                cursor: "pointer",
                "& #hidden-button": {
                  visibility: "hidden",
                },
                "&:hover #hidden-button": {
                  visibility: "visible",
                },
              }}
            >
              <Box>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    message.replyTo === "Kaushal"
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MbzLVrpxVHJaPIUx3QTIKpUaaYlzkpbo_A&usqp=CAU"
                      : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  }
                  sx={
                    isMobile
                      ? { width: 32, height: 32 }
                      : { width: 40, height: 40 }
                  }
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                  }}
                >
                  <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                    {message.replyTo}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#85878A" }}>
                    {message.messageTime}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      width: "100%",
                      color: "#85878A",
                      fontSize: "16px",
                    }}
                  >
                    {message.replyOf}
                  </Typography>
                </Box>

                {message.attachments.length > 0 && (
                  <Box>
                    {message.attachments.map((item, i) => {
                      return (
                        <Box
                          key={i}
                          sx={{
                            width: "100%",
                            height: "56px",
                            border: "1px solid #E5E7EB",
                            borderRadius: "8px",
                            marginTop: "17px",
                            padding: "12px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "9px",
                              alignItems: "center",
                            }}
                            onClick={() => {
                              handlePreview(item.url);
                            }}
                          >
                            <Avatar
                              src="/assets/pdf_icon.png"
                              sx={{ width: 32, height: 32 }}
                            />

                            <Typography
                              sx={{ color: "#85878A", fontSize: "16px" }}
                            >
                              {item.filename}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "10px",
                            }}
                          >
                            <Box
                              id="hidden-button"
                              sx={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#F5F5F6",
                                visibility: "hidden",
                              }}
                              onClick={() => {
                                handlePreview(item.url);
                              }}
                            >
                              <GetAppOutlinedIcon
                                sx={{ width: "24px", height: "32px" }}
                              />
                            </Box>
                            <Box
                              id="hidden-button"
                              sx={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#F5F5F6",
                                visibility: "hidden",
                              }}
                            >
                              <MoreVertOutlinedIcon
                                sx={{ width: "24px", height: "32px" }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    borderRadius: "8px",
                    backgroundColor: "#F5F5F6",
                    marginTop: "8px",
                    padding: "8px",
                    cursor: "pointer",
                    "& #hidden-button": {
                      visibility: "hidden",
                    },
                    "&:hover #hidden-button": {
                      visibility: "visible",
                    },
                  }}
                >
                  <Box>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        message.sender === "Kaushal"
                          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MbzLVrpxVHJaPIUx3QTIKpUaaYlzkpbo_A&usqp=CAU"
                          : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      }
                      sx={{ width: 24, height: 24 }}
                    />
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "8px",
                      }}
                    >
                      <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                        {message.sender}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", color: "#85878A" }}>
                        {formattedTime}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          width: "100%",
                          color: "#85878A",
                          fontSize: "16px",
                        }}
                      >
                        {message.message}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Chats;
