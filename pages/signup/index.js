import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { ROUTE_LOGIN, ROUTE_DASHBOARD } from "../../app/constants/page";
import { UserApi } from "../../app/services/userApi";
import Link from "next/link";
import { useRouter } from "next/router";
import LandingPageLayout from "../../app/layouts/LandingPageLayout";

const SignUp = () => {
  const [signUpCredential, setSignUpCredential] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [terms, setTerms] = useState(false);

  const router = useRouter();

  const handleSignUp = () => {
    if (terms) {
      UserApi.signup(
        signUpCredential,
        (res) => {
          alert(res);
          if (res === "Account created successfully") {
            setSignUpCredential({
              firstname: "",
              lastname: "",
              email: "",
              password: "",
            });
            router.push(ROUTE_DASHBOARD);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert("Please check terms and conditions");
    }
  };
  return (
    <LandingPageLayout>
      <Box
        sx={{
          backgroundColor: "white",
          width: "474px",
          height: "620px",
          borderRadius: "12px",
          padding: "51.24px 42px",
          display: "flex",
          flexDirection: "column",
          gap: "43.55px",
        }}
      >
        <Box>
          <img
            src="/assets/logo.png"
            alt="logo"
            width={"129px"}
            height={"28px"}
          />
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
            Sign up
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#6B7584",
            }}
          >
            Enter your credentials to continue
          </Typography>
          <Box sx={{ display: "flex", gap: "16px" }}>
            <TextField
              id="outlined-basic-1"
              type="text"
              label="First name"
              variant="outlined"
              value={signUpCredential.firstname}
              onChange={(e) => {
                setSignUpCredential({
                  ...signUpCredential,
                  firstname: e.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic-2"
              type="text"
              label="Last name"
              variant="outlined"
              value={signUpCredential.lastname}
              onChange={(e) => {
                setSignUpCredential({
                  ...signUpCredential,
                  lastname: e.target.value,
                });
              }}
            />
          </Box>
          <TextField
            type="email"
            label="Email Address"
            value={signUpCredential.email}
            onChange={(e) => {
              setSignUpCredential({
                ...signUpCredential,
                email: e.target.value,
              });
            }}
          />
          <TextField
            id="outlined-basic-4"
            type="password"
            label="Password"
            variant="outlined"
            value={signUpCredential.password}
            onChange={(e) => {
              setSignUpCredential({
                ...signUpCredential,
                password: e.target.value,
              });
            }}
          />
          <Box display="flex" sx={{ alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setTerms(e.target.checked);
                  }}
                />
              }
              sx={{ color: "#6B7584", mr: 1 }}
            />
            <Link
              href="#"
              underline="none"
              style={{
                color: "#000000",
                marginBlock: "auto",
                fontSize: "14px",
                marginLeft: "-10px",
              }}
            >
              <span style={{ color: "#6B7584" }}>Agree with</span> Terms &
              Condition
            </Link>
          </Box>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize" }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Box>
        <Box>
          <Link
            href={ROUTE_LOGIN}
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
              Already have an account?
            </Typography>
          </Link>
        </Box>
      </Box>
    </LandingPageLayout>
  );
};

export default SignUp;
