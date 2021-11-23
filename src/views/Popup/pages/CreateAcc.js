import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormLabel } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import "../pages/Cards.css";
import Header from "../Components/Header";
const theme = createTheme();

export default function CreateAcc() {
  return (
    <Box sx={{ minWidth: 375, height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Header />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" sx={{ mt: 1 }}>
              <FormLabel
                style={{
                  marginRight: "37%",
                  color: "#5b5b5b",
                  fontSize: "1rem",
                }}
              >
                Account Name
              </FormLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                type="text"
                name="text"
                placeholder="Account 2 "
              />

              <FormGroup>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "transparent",

                      borderColor: "#037dd6",

                      border: "1px solid #037dd6",
                      color: "#037dd6",
                      height: "50px",
                      width: "150px",
                      borderRadius: "100px",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{
                      borderRadius: "100px",
                      height: "50px",
                      width: "150px",
                    }}
                    variant="contained"
                  >
                    Create
                  </Button>
                </div>
              </FormGroup>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}
