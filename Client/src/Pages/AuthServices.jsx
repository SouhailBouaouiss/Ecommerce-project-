import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api";

function AuthServices() {
  // useState to catch the user's email
  const [userEmail, setUserEmail] = useState("");

  // useState to catch the user's pwd
  const [userPwd, setUserPwd] = useState("");

  //  user useContext
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const defaultTheme = createTheme();

  const handleSignIn = useCallback(
    (e) => {
      // Preevent to send the request after clicking submit button

      e.preventDefault();

      // Handle sending the request to the Back-end server

      axiosInstance
        .post("/v1/users/login", {
          email: userEmail,
          pwd: userPwd,
        })
        .then((resp) => {
          const data = resp.data;

          // Handle the case of auth success
          // Context
          user.setUser({
            isConnected: true,
            data: data.user,
          });

          toast.success(data.message);
          navigate("backoffice/dashboard");

          return;
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        }); // The status of 401 is automatically handled by Axios
    },
    [userEmail, userPwd]
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignIn}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={({ target }) => setUserEmail(target.value)}
              value={userEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={({ target }) => setUserPwd(target.value)}
              value={userPwd}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default AuthServices;

// TODO remove, this demo shouldn't need to reset the theme.
