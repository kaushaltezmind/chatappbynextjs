import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Badge,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SettingApi } from "../../../app/services/settingApi";
import { useRouter } from "next/router";
import Settings from "../index";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { CommonContext } from "@/app/store/context/commonContextProvider";
import { toast } from "react-toastify";
import Toast from "@/app/components/Toast";
import { toastStyle } from "@/app/components/Toast/toast";
import { BeatLoader } from "react-spinners";

let file = {};

const PersonalDetails = () => {
  const { image, setImage } = CommonContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  const [bool, setBool] = useState(true);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    mobilenumber: "",
    email: "",
    bio: "",
    address: "",
    image: "",
    portfoliourl: "",
    facebookurl: "",
    twitterurl: "",
    instagramurl: "",
  });

  useEffect(() => {
    SettingApi.getUser(
      (res) => {
        if (res.data.errorCode && res.data.errorCode === 1) {
          if (res.data.errorMessage === "You are not authorised") {
            router.push("/");
            return;
          }
          toast.error(res.data.message, toastStyle);
        } else {
          setUserData(res.data.data);
          setSelectedImage(res.data.data.image);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const handleUpdate = () => {
    setBool(false);

    const fetchConnections = () => {
      if (
        userData.firstname === "" ||
        userData.lastname === "" ||
        userData.mobilenumber === 0 ||
        userData.address === ""
      ) {
        setFlag(true);
      } else {
        const formData = new FormData();
        formData.append("file", file);

        SettingApi.uploadImage(
          formData,
          (res) => {
            setImage(!image);
          },
          (err) => {
            toast.error("Something went wrong", toastStyle);
          }
        );
        SettingApi.updateUserDetails(
          userData,
          (res) => {
            if (res.data.errorCode === 1) {
              toast.warning(res.data.errorMessage, toastStyle);
            } else {
              toast.success(res.data.message, toastStyle);
              setBool(true);
            }
          },
          (err) => {
            toast.error("Something went wrong", toastStyle);
          }
        );
      }
    };

    // fetchConnections();

    const intervalId = setTimeout(() => {
      fetchConnections();
    }, 1000);

    return () => clearInterval(intervalId);
  };

  const handleClear = () => {
    setUserData({
      ...userData,
      lastname: "",
      bio: "",
      facebookurl: "",
      twitterurl: "",
      instagramurl: "",
      mobilenumber: "",
      portfoliourl: "",
      address: "",
    });
  };

  const handleBadgeChange = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Settings>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
          }}
        >
          <Box
            sx={{
              width: "623px",
              display: "flex",
              gap: "24px",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                height: "264px",
                border: "1px solid #E8E8E8",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <Box
                sx={{ padding: "14px 23px", borderBottom: "1px solid #DEE4EA" }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                  Personal information
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: "26px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "29px",
                }}
              >
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                      sx={{ width: "276px" }}
                      id="outlined-basic-1"
                      type="text"
                      label="First name"
                      variant="outlined"
                      required
                      value={userData.firstname}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          firstname: e.target.value,
                        });
                      }}
                    />
                    {flag === true && !userData.firstname && (
                      <Typography
                        color="error"
                        sx={{
                          fontSize: "10px",
                          marginTop: "5px",
                          marginBottom: "-20px",
                          marginLeft: "14px",
                        }}
                      >
                        Please enter firstname
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                      sx={{ width: "276px" }}
                      id="outlined-basic-2"
                      type="text"
                      label="Last name"
                      variant="outlined"
                      value={userData.lastname}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          lastname: e.target.value,
                        });
                      }}
                    />
                    {flag === true && !userData.lastname && (
                      <Typography
                        color="error"
                        sx={{
                          fontSize: "10px",
                          marginTop: "5px",
                          marginBottom: "-20px",
                          marginLeft: "14px",
                        }}
                      >
                        Please enter lastname
                      </Typography>
                    )}
                  </Box>
                </Box>

                <TextField
                  id="outlined-multiline-flexible"
                  label="Bio"
                  multiline
                  rows={2}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "79px",
                    },
                  }}
                  value={userData.bio}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      bio: e.target.value,
                    });
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                border: "1px solid #E8E8E8",
                borderRadius: "16px",
                textAlign: "left",
                flex: 1,
              }}
            >
              <Box
                sx={{ padding: "14px 23px", borderBottom: "1px solid #DEE4EA" }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                  Social information
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "24px",
                  gap: "24px",
                }}
              >
                <TextField
                  id="outlined-basic-4"
                  type="text"
                  label="Facebook URL"
                  variant="outlined"
                  value={userData.facebookurl}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      facebookurl: e.target.value,
                    });
                  }}
                />
                <TextField
                  id="outlined-basic-5"
                  type="text"
                  label="Twitter URL"
                  variant="outlined"
                  value={userData.twitterurl}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      twitterurl: e.target.value,
                    });
                  }}
                />
                <TextField
                  id="outlined-basic-6"
                  type="text"
                  label="Instagram URL"
                  variant="outlined"
                  value={userData.instagramurl}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      instagramurl: e.target.value,
                    });
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Box
              sx={{
                flex: 1,
                border: "1px solid #E8E8E8",
                borderRadius: "16px",
                textAlign: "left",

                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
              }}
            >
              <Box
                sx={{ padding: "14px 23px", borderBottom: "1px solid #DEE4EA" }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                  Upload your profile photo
                </Typography>
              </Box>

              <Box sx={{ padding: "23px 23px" }}>
                <Badge
                  color="secondary"
                  overlap="circular"
                  badgeContent={<CameraAltOutlinedIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    width: "82px",
                    cursor: "pointer",
                    "& .MuiBadge-badge": {
                      backgroundColor: "black",
                      border: "1px solid white",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                    },
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  onClick={handleBadgeChange}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={selectedImage}
                    sx={{ width: 82, height: 82, border: "1px solid #DEE4EA" }}
                  />

                  <TextField
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Badge>
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                border: "1px solid #E8E8E8",
                borderRadius: "16px",
                textAlign: "left",
              }}
            >
              <Box
                sx={{ padding: "14px 23px", borderBottom: "1px solid #DEE4EA" }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                  Contact information
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "24px",
                  gap: "29px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="outlined-basic-7"
                    type="number"
                    label="Contact phone"
                    variant="outlined"
                    value={userData.mobilenumber}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        mobilenumber: Number(e.target.value),
                      });
                    }}
                  />
                  {flag === true && !userData.mobilenumber && (
                    <Typography
                      color="error"
                      sx={{
                        fontSize: "10px",
                        marginTop: "5px",
                        marginBottom: "-20px",
                        marginLeft: "14px",
                      }}
                    >
                      Please enter contact number
                    </Typography>
                  )}
                </Box>
                <TextField
                  disabled
                  id="filled-disabled"
                  label="Email"
                  variant="outlined"
                  value={userData.email}
                />
                <TextField
                  id="outlined-basic-9"
                  type="text"
                  label="Portfolio url"
                  variant="outlined"
                  value={userData.portfoliourl}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      portfoliourl: e.target.value,
                    });
                  }}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="outlined-multiline-flexible-2"
                    label="Address"
                    multiline
                    rows={4}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "110px",
                      },
                    }}
                    value={userData.address}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        address: e.target.value,
                      });
                    }}
                  />
                  {flag === true && !userData.address && (
                    <Typography
                      color="error"
                      sx={{
                        fontSize: "10px",
                        marginTop: "5px",
                        marginBottom: "-20px",
                        marginLeft: "14px",
                      }}
                    >
                      Please enter address
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right", gap: "8px" }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "transparent",
              padding: "11px 22px",
            }}
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize", padding: "11px 22px" }}
            onClick={handleUpdate}
          >
            {bool ? (
              "Update Details"
            ) : (
              <BeatLoader color="white" margin={2} size={10} />
            )}
          </Button>
        </Box>
      </Box>
      <Toast />
    </Settings>
  );
};

export default PersonalDetails;
