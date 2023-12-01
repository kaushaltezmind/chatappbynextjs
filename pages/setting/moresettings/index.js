import { Box, Typography, Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import Settings from "../index";

const label = { inputProps: { "aria-label": "Size switch demo" } };

const MoreSettings = () => {
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
            Email Settings
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "21px 23px 16px 23px ",
            borderBottom: "1px solid #DEE4EA",
          }}
        >
          <Typography
            sx={{ fontWeight: 600, fontSize: "14px", marginBottom: "5px" }}
          >
            Setup email notification
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              gap: "5px",
              marginLeft: "-12px",
              marginBottom: "5px",
            }}
          >
            <Switch {...label} defaultChecked size="large" />
            <Typography sx={{ color: "#6B7584", fontSize: "14px" }}>
              Email notification
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              gap: "5px",
              marginLeft: "-12px",
            }}
          >
            <Switch {...label} />
            <Typography sx={{ color: "#6B7584", fontSize: "14px" }}>
              Send copy to personal email
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            padding: "21px 15px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              padding: "11px 22px",
            }}
          >
            Update Settings
          </Button>
        </Box>
      </Box>
    </Settings>
  );
};

export default MoreSettings;
