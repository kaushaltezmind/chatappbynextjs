import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { SettingApi } from "../../../app/services/settingApi";
import { useRouter } from "next/router";
import Settings from "../index";

const PersonalDetails = () => {
  const router = useRouter();
  const [flag, setFlag] = useState(false);
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
          alert(res.data.errorMessage);
        } else {
          setUserData(res.data.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const handleUpdate = () => {
    console.log(userData);
    if (
      userData.firstname === "" ||
      userData.lastname === "" ||
      userData.mobilenumber === 0 ||
      userData.address === ""
    ) {
      setFlag(true);
    } else {
      SettingApi.updateUserDetails(
        userData,
        (res) => {
          if (res.data.errorCode && res.data.errorCode === 1) {
            alert(res.data.errorMessage);
          } else {
            alert(res.data.message);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
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
                height: "307px",
                border: "1px solid #E8E8E8",
                borderRadius: "16px",
                textAlign: "left",
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
              height: "454px",
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
            Update Details
          </Button>
        </Box>
      </Box>
    </Settings>
  );
};

export default PersonalDetails;