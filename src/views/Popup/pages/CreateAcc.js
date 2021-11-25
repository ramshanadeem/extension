import React, { useState, useEffect } from "react";
import { hdkey } from "ethereumjs-wallet";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import { ethers } from "ethers";
import {
  CrytoToUSD,
  decrypt,
  fetchERC20TokenInfo,
  fetchETHBalance,
  fetchERC20TxHistory,
  fetchTxHistory,
} from "../../../Utils/Utils";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormLabel } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import "../pages/Cards.css";
import Header from "../Components/Header";
import { useHistory } from "react-router";
import Web3 from "web3";
const theme = createTheme();
export const conciseAddress = (address) => {
  if (Web3.utils.isAddress(address)) {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  }
  return "-";
};
export default function CreateAcc() {
  // const [address, setAddress] = useState("");
  const [mnemonics, setMnemonics] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [CreatedNew, setCreatedNew] = useState();
  const history = useHistory();
  const CancelBtn = () => {
    history.push("/createdMask");
  };

  // useEffect(() => {
  //   (async () => {
  //     let data = localStorage.getItem("data");
  //     setEncryptedData(data);
  //     let hashedpassword = localStorage.getItem("hashedpassword");
  //     console.log("current value is ", hashedpassword);
  //     setEncryptedPassword(hashedpassword);

  //     const { publicKey, address, privateKey, mnemonic } = await decrypt(
  //       data,
  //       hashedpassword
  //     );
  //     setPublicKey(publicKey);
  //     setAddress(address);
  //     setPrivateKey(privateKey);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      // let data = localStorage.getItem("data");
      // setEncryptedData(data);
      // let hashedpassword = localStorage.getItem("hashedpassword");
      // console.log("current value is ", hashedpassword);
      // setEncryptedPassword(hashedpassword);

      // const { publicKey, address, privateKey, mnemonic } = await decrypt(
      //   data,
      //   hashedpassword
      // );
      // setPublicKey(publicKey);
      // setAddress(address);
      // setPrivateKey(privateKey);
      // let i = localStorage.getItem("i");
      // for (i = 0; i < localStorage.length; i++) {

      // let i = localStorage.getItem(address);
      // localStorage.getItem(localStorage.key(i));
      // i++;
      // console.log(i);

      // }
      // const { mnemonic } = await decrypt(data, hashedpassword);
      // console.log("mnemonic", mnemonic);
      // setMnemonics(mnemonic.phrase);

      const mnemonic =
        "gentle mutual speak consider mandate kingdom cash explain soul exile cabin squeeze";
      // const hdwallet = hdkey.fromMasterSeed(mnemonic).toString();
      const hdwallet = hdkey.fromMasterSeed(mnemonic);

      let createdNewacc = localStorage.getItem("createdNewacc") + 1;
      console.log("current account  is ", createdNewacc);
      setCreatedNew(createdNewacc);
      localStorage.setItem("createdNewacc", createdNewacc++);

      const path = "m/44'/60'/" + createdNewacc + "'/0/0";
      console.log(path);
      const wallet = hdwallet.derivePath(path).getWallet();
      // const wallet = hdwallet.derivePath(path).getWallet();
      console.log(
        "Private Key ",
        "0x" + wallet.getPrivateKey().toString("hex")
      );
      const address = `0x${wallet.getAddress().toString("hex")}`;
      console.log(address);
    })();
  }, []);
  // const newAddress = () => {
  //   console.log(conciseAddress(address));
  // };
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
                    onClick={CancelBtn}
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
                    // onClick={newAddress}
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
