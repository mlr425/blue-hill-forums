import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import Input from "./Input";
import Icon from "./Icon";
import { login, register } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
} from "@mui/material";

/*
Q: Do I need to hide the OAuth clientID?
A: https://stackoverflow.com/questions/40354720/angular2-with-auth0-do-i-need-to-hide-my-clientid-and-domain
    i guess not


*/

const initalState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(initalState);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [credentialError, setCredentialError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(register(formData, navigate, setCredentialError));
    } else {
      dispatch(login(formData, navigate, setCredentialError));
    }
  };

  const handleChange = (e) => {
    //when user retypes their, reset error message
    setCredentialError(null);

    //change the object(user)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //toggle show password eyeball
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  //toggle user creation / login
  const switchMode = () => {
    setIsLogin((p) => !p);
    setShowPassword(false);
    setCredentialError(null);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      //console.log(error);
      setCredentialError("Google Login was unsuccessful. Try again later.");
    }
  };

  const googleFailure = (error) => {
    //console.log(error);
    //console.log("Google Login was unsuccessful. Try again later.");
    setCredentialError("Google Login was unsuccessful. Try again later.");
  };

  return (
    <Container>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "15px",
        }}
        elevation={3}
      >
        <Avatar
          sx={{
            backgroundColor: credentialError ? "red" : "#5D9CEC",
            color: "black",
          }}
        >
          BH
        </Avatar>
        <Typography sx={{ margin: "5px" }} variant="h5">
          {isLogin ? "Register" : "Login"}
        </Typography>
        {credentialError && (
          <Paper sx={{ padding: "20px" }} elevation={0}>
            <Typography variant="overline">{credentialError}</Typography>
          </Paper>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
            {isLogin && (
              <Input
                name="name"
                label="name"
                handleChange={handleChange}
                autoFocus
              />
            )}
            <Input
              name="email"
              label="Email Adress"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isLogin && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            sx={{ marginBottom: "1px" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isLogin ? "Register now" : "Login"}
          </Button>
          {isLogin ? null : (
            <GoogleLogin
              clientId="1082770669865-7dorvtgedqcqna7dl18uhe191jcuddfv.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Log in with Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          )}
          <Grid container>
            <Grid item>
              <Button onClick={switchMode}>
                {isLogin ? "Already a user? Login" : "Not registered? Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
