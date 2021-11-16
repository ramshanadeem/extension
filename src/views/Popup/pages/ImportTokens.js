import React, { useEffect, useState } from "react";
// import "./CreatedMask.css";
import { useHistory } from "react-router-dom";

import "./ImportTokens.css";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Buttons from "../Components/Buttons";
import CloseIcon from "@mui/icons-material/Close";
function ImportTokens() {
  const [network, setNetwork] = useState("rinkeby");
  let history = useHistory();
  const crossClick = () => {
    history.push("./createdMask");
  };
  return (
    <div sx={{ minWidth: 375, height: 700 }}>
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography className="typograph"> Import Tokens </Typography>
          <Button style={{ color: "#4d4d4d", }} onClick={crossClick}>
            <CloseIcon />
          </Button>
        </div>
        <Typography className="typograph1">Custom Token</Typography>
        <hr style={{ width: "100%", marginRight: "30%" }} />
      </div>
      <Container component="main" maxWidth="xs">
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <FormLabel className="formLabel1">Token Contract Address</FormLabel>
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
            className="formLabel2"
            // style={{
            //   marginRight: "59%",
            //   color: "#5b5b5b",
            //   fontSize: "1rem",
            // }}
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
            className="formLabel3"
            // style={{
            //   marginRight: "59%",
            //   color: "#5b5b5b",
            //   fontSize: "1rem",
            // }}
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
            // type="number"
            id="number"
            // autoComplete="current-password"
          />
        </Box>
      </Container>
      <hr style={{ width: "100%", marginRight: "10%" }} />
      <Buttons className="Custom" btn=" Add Custom Token" />
    </div>
  );
}

export default ImportTokens;
