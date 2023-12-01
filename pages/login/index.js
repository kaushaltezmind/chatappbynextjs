import { Inter } from "next/font/google";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { UserApi } from "../../app/services/userApi";
import { ROUTE_SIGNUP, ROUTE_DASHBOARD } from "../../app/constants/page";
import Image from "next/image";
import { useRouter } from "next/router";
import LandingPageLayout from "../../app/layouts/LandingPageLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSignIn = () => {
    UserApi.login(
      loginCredential,
      (res) => {
        alert(res);
        if (res === "Login successful") {
          setLoginCredential({ email: "", password: "" });
          let redirectPath = localStorage.getItem("redirectpath");

          let redirectPathData =
            JSON.parse(localStorage.getItem("pathdetail")) || {};
          var username = localStorage.getItem("username");

          if (redirectPath) {
            localStorage.removeItem("redirectpath");
            router.push(redirectPath);
          } else if (redirectPathData[username]) {
            router.push(redirectPathData[username]);
          } else {
            router.push(ROUTE_DASHBOARD);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <LandingPageLayout>
      <Box
        sx={{
          backgroundColor: "white",
          width: "474px",
          height: "544px",
          borderRadius: "12px",
          padding: "51.24px 42px",
          display: "flex",
          flexDirection: "column",
          gap: "43.55px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src="/assets/logo.png" alt="logo" width={129} height={28} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "20px",
              color: "#0064d9",
            }}
          >
            HI, Welcome Back
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#6B7584",
            }}
          >
            Enter your credentials to continue
          </Typography>
          <TextField
            id="outlined-basic-1"
            type="email"
            label="Email Address"
            variant="outlined"
            value={loginCredential.email}
            onChange={(e) => {
              setLoginCredential({ ...loginCredential, email: e.target.value });
            }}
          />
          <TextField
            id="outlined-basic-2"
            type="password"
            label="Password"
            variant="outlined"
            value={loginCredential.password}
            onChange={(e) => {
              setLoginCredential({
                ...loginCredential,
                password: e.target.value,
              });
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                color: "#0064d9",
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize" }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Box>
        <Box>
          <Link
            href={ROUTE_SIGNUP}
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                color: "#0064d9",
              }}
            >
              Don’t have an account?
            </Typography>
          </Link>
        </Box>
      </Box>
    </LandingPageLayout>
  );
}
