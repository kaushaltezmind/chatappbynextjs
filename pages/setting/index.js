import * as React from "react";
import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ROUTE_SETTINGS } from "../../app/constants/page";
import { useRouter } from "next/router";
import DashBoardPageLayout from "@/app/layouts/DashBoardPageLayout";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Settings = ({ children }) => {
  const [value, setValue] = React.useState(0);

  const router = useRouter();

  React.useEffect(() => {
    if (router.pathname === "/setting/changepassword") {
      setValue(1);
    } else if (router.pathname === "/setting/moresettings") {
      setValue(2);
    } else {
      setValue(0);
    }
  }, [router.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <DashBoardPageLayout>
      <Box
        sx={{
          borderRadius: "16px",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              padding: "15px 20px 0 20px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Personal Details"
                onClick={() => router.push(`${ROUTE_SETTINGS}/personaldetails`)}
                {...a11yProps(0)}
              />
              <Tab
                label="Change Password"
                onClick={() => router.push(`${ROUTE_SETTINGS}/changepassword`)}
                {...a11yProps(1)}
              />
              <Tab
                label="Settings"
                onClick={() => router.push(`${ROUTE_SETTINGS}/moresettings`)}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {children}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {children}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {children}
          </CustomTabPanel>
        </Box>
      </Box>
    </DashBoardPageLayout>
  );
};

export default Settings;
