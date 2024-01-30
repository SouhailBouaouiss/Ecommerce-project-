import React, { useCallback, useContext, useEffect } from "react";
import { UserContext } from "../contexts/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { axiosInstance } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
const styles = {
  form: {
    maxWidth: "800px",
    margin: "auto", // Center the form horizontally
    marginTop: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center items horizontally
    gap: "40px", // Add spacing between items
    marginBottom: "250px",
  },
  inputContainer: {
    width: "100%",
    gap: "50px",
  },
  button: {
    marginTop: "16px",
    backgroundColor: "black",
    color: "white",
    width: "200px",
  },
};

function CustomerEditPage() {
  const { control, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission logic here
    axiosInstance
      .patch("/v1/customers/profile/update", data)
      .then((resp) => {
        const data = resp.data;

        customerContext.setUser({
          isConnected: true,
          data: data.user,
        });

        toast.success(data.message);
        navigate("/customer/edit");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };
  const customerContext = useContext(UserContext);
  const customerCurrentData = customerContext.user.data;
  console.log(customerCurrentData);

  useEffect(() => {
    if (!customerCurrentData) {
      axiosInstance
        .post("/verify")
        .then((resp) => {
          console.log("Resp", resp);
          const data = resp.data;

          customerContext.setUser({
            isConnected: true,
            data: data.user,
          });

          toast.success(data.message);
          return;
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
          navigate("/authentication");
        });
    }
  }, [customerCurrentData]);

  if (customerCurrentData) {
    return (
      <form style={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h6
          style={{
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "8px",
            color: "black",
            fontFamily: "Gruppo', sans-serif",
            fontWeight: "1rem",
          }}
        >
          Edit profile
        </h6>
        <Grid container spacing={2} margin={"auto"}>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <Controller
                name="first_name"
                control={control}
                defaultValue={customerCurrentData.first_name}
                render={({ field }) => (
                  <TextField label="First Name" fullWidth {...field} />
                )}
              />
            </Grid>

            <Grid item xs={12} marginTop={"50px"}>
              <Controller
                name="last_name"
                control={control}
                defaultValue={customerCurrentData.last_name}
                render={({ field }) => (
                  <TextField label="Last Name" fullWidth {...field} />
                )}
              />
            </Grid>
          </Grid>

          <Grid container item xs={6} style={styles.inputContainer}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue={customerCurrentData.email}
                render={({ field }) => (
                  <TextField label="Email" type="email" fullWidth {...field} />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="pwd"
                control={control}
                defaultValue={customerCurrentData.pwd}
                render={({ field }) => (
                  <TextField label="Password" fullWidth {...field} />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" style={styles.button}>
          Edit
        </Button>
      </form>
    );
  }
}

export default CustomerEditPage;
