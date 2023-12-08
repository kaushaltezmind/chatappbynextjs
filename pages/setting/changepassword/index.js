import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { SettingApi } from "../../../app/services/settingApi";
import Settings from "../index";
import { toast } from "react-toastify";
import { toastStyle } from "@/app/components/Toast/toast";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const handleClear = () => {
    setPasswords({
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    });
  };

  const handleUpdate = () => {
    SettingApi.changePassword(
      passwords,
      (res) => {
        if (res.data.errorCode && res.data.errorCode === 1) {
          toast.error(res.data.message, toastStyle);
        } else {
          toast.success(res.data.message, toastStyle);
          setPasswords({
            currentpassword: "",
            newpassword: "",
            confirmpassword: "",
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <Settings>
      <Box
        sx={{
          border: "1px solid #E8E8E8",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
        }}
      >
        <Box sx={{ padding: "14px 23px", borderBottom: "1px solid #DEE4EA" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            Personal information
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "26px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={{ width: "498px" }}
              id="outlined-basic-1"
              type="text"
              label="Current password"
              variant="outlined"
              required
              value={passwords.currentpassword}
              onChange={(e) => {
                setPasswords({
                  ...passwords,
                  currentpassword: e.target.value,
                });
              }}
            />
            {/* {flag === true && !userData.firstname && (
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
         )} */}
          </Box>
          <Box sx={{ display: "flex", gap: "24px" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                sx={{ width: "498px" }}
                type="password"
                id="outlined-basic-3"
                label="New password"
                variant="outlined"
                required
                value={passwords.newpassword}
                onChange={(e) => {
                  setPasswords({
                    ...passwords,
                    newpassword: e.target.value,
                  });
                }}
              />
              {/* {flag === true && !userData.lastname && (
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
         )} */}
            </Box>
            <Box>
              {" "}
              <TextField
                sx={{ width: "498px" }}
                id="outlined-basic-4"
                type="password"
                label="Confirm password"
                variant="outlined"
                required
                value={passwords.confirmpassword}
                onChange={(e) => {
                  setPasswords({
                    ...passwords,
                    confirmpassword: e.target.value,
                  });
                }}
              />
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
              sx={{
                textTransform: "capitalize",
                padding: "11px 22px",
              }}
              onClick={handleUpdate}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Box>
    </Settings>
  );
};

export default ChangePassword;
