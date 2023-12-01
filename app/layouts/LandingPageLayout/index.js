import { Box } from "@mui/material";

const LandingPageLayout = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(/assets/bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 1000px rgba(91,100,110,.7)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default LandingPageLayout;
