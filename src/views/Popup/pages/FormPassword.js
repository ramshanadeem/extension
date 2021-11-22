// import * as React from 'react';
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormLabel } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Buttons from "../Components/Buttons";
import "./Cards.css";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import useForm from "./useForm";
import ValidateInfo from "./ValidateInfo";
function Copyright(props) {
  return <></>;
}

const theme = createTheme();

export default function SignIn() {
  const { handleChange, values, handleSubmit, errors, user, valid } =
    useForm(ValidateInfo);

  // const [password, setPassword] = useState("");
  // const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  if (valid) {
    history.push("/createdMask");
  }

  const createWallet = async () => {
    let randomSeed = ethers.Wallet.createRandom();
    console.log("randomseed.menmonics", randomSeed.mnemonic);
    console.log("randomSeed.address", randomSeed.address);
    let hashedpassword = ethers.utils.hashMessage(values.password);
    console.log("hashedpassword", hashedpassword);
    let encryptPromise = await randomSeed.encrypt(hashedpassword);

    console.log("ENCRYOPTED====", encryptPromise);
    localStorage.setItem("data", encryptPromise);
    console.log("value is set to the data is " + encryptPromise);
    // setEncryptedData(data);

    localStorage.setItem("hashedpassword", hashedpassword);
    console.log("current value is ", hashedpassword);
    console.log("the value is set the password is" + hashedpassword);
    // setEncryptedPassword(hashedpassword);
    // let data = localStorage.setItem({ data: encryptPromise }, () => {
    //   console.log("value is set to the data is " + encryptPromise);
    // });
    // let hashedPassword = localStorage.setItem({ hashedpassword }, () => {
    //   console.log("the value is set the password is" + hashedpassword);
    // });

    // history.push("/seedPhrase");
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  //   console.log({
  //     email: data.get("email"),
  //     password1: data.get("password"),
  //   });
  // };

  return (
    <Box sx={{ minWidth: 375, height: "100vh" }}>
      <ThemeProvider theme={theme}>
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
            <Typography
              component="h1"
              variant="h4"
              style={{
                fontSize: "2.5rem",
                marginBottom: "5%",
                marginRight: "5%",
              }}
            >
              Create Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormLabel
                style={{
                  marginRight: "37%",
                  color: "#5b5b5b",
                  fontSize: "1rem",
                }}
              >
                New Password (min 8 chars)
              </FormLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                name="password"
                error={errors.password ? true : false}
                helperText={errors.password}
                value={values.password}
                onChange={handleChange}
              />
              {/* <p style={{ color: "red", fontSize: "12px", marginRight: "35%" }}>
                {errors.password}
              </p> */}
              <FormLabel
                style={{
                  marginRight: "59%",
                  color: "#5b5b5b",
                  fontSize: "1rem",
                }}
              >
                Confirm Password
              </FormLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                error={errors.password2 ? true : false}
                helperText={errors.password2}
                value={values.password2}
                onChange={handleChange}
                type="password"
                id="password"
                autoComplete="current-password"
              />

              {/* <p style={{ color: "red", fontSize: "12px", marginRight: "58%" }}>
                {" "}
                {errors.password2}
              </p> */}
              <FormGroup>
                {/* <FormControlLabel style={{color:"#939090",fontWeight:"inherit",fontSize:"inherit"}} control={<Checkbox defaultChecked />}  /> */}

                <Grid item xs style={{ marginRight: "10px" }}>
                  <Checkbox />
                  <span style={{ fontSize: "16px" }}>
                    I have read and agree to the
                    <Link href="#" variant="body2" style={{ fontSize: "15px" }}>
                      <span> Term of use </span>
                    </Link>
                  </span>
                </Grid>
                <div
                  style={{
                    marginRight: "60px",
                    width: "20px",
                    marginTop: "20px",
                    marginBottom: "30px",
                  }}
                >
                  {/* <Buttons
                    disabled={!password}
                    onClick={createWallet}
                    style={{ width: "20px" }}
                    btn="Create"
                    className="createBtn"
                  /> */}
                  {/* <Buttons
                    disabled={!password}
                    onClick={createWallet}
                    style={{ width: "20px" }}
                    btn="Create"
                    className="createBtn"
                  /> */}
                  <button
                    onClick={createWallet}
                    type="submit"
                    className="createBtn"
                  >
                    create
                  </button>
                </div>
              </FormGroup>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </Box>
  );
}
