import React, { useEffect, useState } from "react";
// import "./CreatedMask.css";
import "./ImportTokens.css";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Buttons from "../Components/Buttons";
function ImportTokens() {
  const [network, setNetwork] = useState("rinkeby");
  return (
    <div sx={{ minWidth: 375, height: "100vh" }}>
      <div className="header">
        <div>
          <select
            className="dropdown"
            onChange={(e) => setNetwork(e.target.value)}
          >
            <option className="dropdown" value="homestead">
              Ethereum Mainnet
            </option>
            <option value="rinkeby" selected>
              Rinkeby
            </option>
            <option value="ropsten">Ropsten</option>
            <option value="kovan">Kovan</option>
            <option value="goerli">Goerili</option>
          </select>
        </div>
      </div>
      <div>
        <Typography className="typograph"> Import Tokens </Typography>
        <Typography className="typograph1">Custom Token</Typography>
        <hr />
      </div>
      <Container component="main" maxWidth="xs">
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <FormLabel
            style={{
              marginRight: "37%",
              color: "#5b5b5b",
              fontSize: "1rem",
            }}
          >
            Token Contract Address
          </FormLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            // value={password} onChange={(e)=>setPassword(e.target.value)}
          />
          <FormLabel
            style={{
              marginRight: "59%",
              color: "#5b5b5b",
              fontSize: "1rem",
            }}
          >
            Token Symbol
          </FormLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            name="string"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            type="string"
            id="password"
            // autoComplete="current-password"
          />

          <FormLabel
            style={{
              marginRight: "59%",
              color: "#5b5b5b",
              fontSize: "1rem",
            }}
          >
            Token Decimal
          </FormLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            name="number"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            type="number"
            id="number"
            // autoComplete="current-password"
          />
        </Box>
      </Container>
      <hr />
      <Buttons className="Custom" btn=" Add Custom Token" />
    </div>
  );
}

export default ImportTokens;
