// SignInSignUp.jsx
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Link, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api";
import { UserContext } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { CartContext } from "../contexts/CartContext";

const SignInSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();
  const { openCart, setOpenCart } = useContext(CartContext);

  const [isSignIn, setIsSignIn] = useState(true);
  const customer = useContext(UserContext);

  const handleToggleForm = () => {
    setIsSignIn((prevIsSignIn) => !prevIsSignIn);
  };

  const onSubmit = () => {
    axiosInstance
      .post("/v1/customers/login", { ...getValues() })
      .then((resp) => {
        const data = resp.data;

        // Handle the case of auth success
        // Context
        customer.setUser({
          isConnected: true,
          data: data.user,
        });

        toast.success(data.message);
        navigate("/landingpage");
        setOpenCart(true);

        return;
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isSignIn && (
            <>
              {errors.firstName && <p>{errors.firstName.message}</p>}
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                {...register("lastName", { required: "Last Name is required" })}
              />
            </>
          )}
          {errors.email && <p>{errors.email.message}</p>}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register("email", { required: "Email is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("pwd", { required: "Password is required" })}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "black",
              color: "white",
              marginTop: "18px",
              fontFamily: "Zurich Extended, sans-serif",
            }}
          >
            Sign {isSignIn ? "In" : "Up"}
          </Button>
          <div style={{ marginTop: "12px", textAlign: "center" }}>
            <Link onClick={handleToggleForm}>
              {isSignIn
                ? "Don't have an account? Join us!"
                : "Already have an account? Sign In!"}
            </Link>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default SignInSignUp;
