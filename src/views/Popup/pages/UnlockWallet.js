import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MetaMaskIcon } from "../../../Assets";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Buttons from "../Components/Buttons";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import { ethers } from "ethers";
import ValidateInfo from "./ValidateInfo";
import useForm from "./useForm";
import Header from "../Components/Header";
function UnlockWallet() {
  const { handleSubmit } = useForm(ValidateInfo);

  const classes = useStyles();
  const [network, setNetwork] = useState("rinkeby");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const ONChange = (event) => {
    setNetwork(event.target.value);
  };

  const unlock = async () => {
    // let randomSeed = ethers.Wallet.createRandom();
    // console.log("randomseed.menmonics", randomSeed.mnemonic);
    // console.log("randomSeed.address", randomSeed.address);
    let hashedpassword2 = ethers.utils.hashMessage(password);
    console.log("hashedpassword", hashedpassword2);
    // let encryptPromise = await randomSeed.encrypt(hashedpassword);

    // console.log("ENCRYOPTED====", encryptPromise);
    // localStorage.setItem("data", encryptPromise);
    // console.log("value is set to the data is " + encryptPromise);
    // setEncryptedData(data);

    localStorage.setItem("hashedpassword2", hashedpassword2);
    console.log("value of hashed2 ", hashedpassword2);
    console.log("the value is set the passwordunlock is" + hashedpassword2);

    if (hashedpassword2 === localStorage.hashedpassword) {
      console.log("matched password==========");
      history.push("/createdMask");
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <Header />
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        className="header"
      >
        <div className="metamask">
          <img
            height="32px"
            src={MetaMaskIcon}
            className="app-header__metafox-logo--horizontal"
            alt=""
          />
        </div>
        <div style={{ marginRight: "10px" }}>
          <Select style={{ right: "60px" }} value={network} onChange={ONChange}>
            <MenuItem value="homestead">
              <div className="color-indicator color-indicator--filled color-indicator--border-color-mainnet color-indicator--color-mainnet color-indicator--size-lg"></div>
              <span> Ethereum Mainnet </span>
            </MenuItem>
            <MenuItem value="rinkeby" selected>
              <div class="color-indicator color-indicator--filled color-indicator--border-color-white color-indicator--color-ropsten color-indicator--size-lg">
                <span class="color-indicator__inner-circle"></span>
              </div>
              Ropsten Test Network
            </MenuItem>

            <MenuItem value="ropsten">
              <div class="color-indicator color-indicator--filled color-indicator--border-color-white color-indicator--color-kovan color-indicator--size-lg">
                <span class="color-indicator__inner-circle"></span>
              </div>
              Kovan
            </MenuItem>
            <MenuItem value="kovan">
              <div class="color-indicator color-indicator--filled color-indicator--border-color-rinkeby color-indicator--color-rinkeby color-indicator--size-lg">
                <span class="color-indicator__inner-circle"></span>
              </div>
              Rinkeby Test Network
            </MenuItem>

            <MenuItem value="goerli">
              <div
                class="  color-indicator color-indicator--filled
              color-indicator--border-color-goerli color-indicator--color-goerli
              color-indicator--size-lg Goerili"
              >
                <span class="color-indicator__inner-circle"></span>
              </div>
              Goerli Test Network
            </MenuItem>

            <MenuItem value="localhost 8545">
              <div class="color-indicator color-indicator--filled color-indicator--border-color-ui-2 color-indicator--color-ui-2 color-indicator--size-lg">
                <span class="color-indicator__inner-circle"></span>
              </div>
              Localhost 8545
            </MenuItem>
            <MenuItem value=" custom RPC">
              <div class="color-indicator color-indicator--filled color-indicator--border-color-ui-2 color-indicator--color-transparent color-indicator--size-lg">
                <span class="color-indicator__inner-circle"></span>
              </div>
              Custom RPC
            </MenuItem>
          </Select>
        </div>
      </div> */}
      <div>
        <img className={classes.imgpara} src={MetaMaskIcon} />
        <br />
        <span className={classes.welcomeSpan}>Welcome Back!</span>
        <br />
        <span className={classes.paraSpan}>The decentralize web awaits</span>
        <br />
      </div>

      <div component="form" onSubmit={handleSubmit}>
        <TextField
          style={{ marginTop: "80px", width: "350px" }}
          margin="normal"
          required
          fullWidth
          id="password"
          type="password"
          name="password"
          // error={errors.password ? true : false}
          // helperText={errors.password}
          // value={values.password}
          // onChange={handleChange}
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {console.log("value========", password)}
        <div className={classes.btnDiv}>
          {/* <Buttons
            disabled={!password}
            onClick={unlock}
            className={classes.unlockBtn}
            btn="Unlock"
          /> */}
          <button type="submit" className="createBtn" onClick={unlock}>
            Unlock
          </button>
        </div>
        <br />
        <span>
          <span style={{ fontSize: "16px", color: "#aeaeae" }}> or</span>
          <Button className={classes.phraseBtn} href="#text-buttons">
            {" "}
            import using Secret Recovery Phrase
          </Button>
        </span>
        <br />
        <span>
          <span style={{ fontSize: "16px", color: "#aeaeae" }}>
            {" "}
            Need help? Contact{" "}
          </span>
          <Button className={classes.phraseBtn} href="#text-buttons">
            {" "}
            MetaMask Support
          </Button>
        </span>
      </div>
    </div>
  );
}

export default UnlockWallet;
const useStyles = makeStyles((theme) => ({
  unlockBtn: {
    width: "350px",
    borderRadius: "50px !important",
    height: "50px",
    textTransform: "capitalize !important",
    fontfamily: "Euclid, Roboto, Helvetica, Arial, sans-serif",
  },
  phraseBtn: {
    textTransform: "capitalize !important",
  },
  welcomeSpan: {
    fontSize: "2rem",
    fontfamily: "Euclid, Roboto, Helvetica, Arial, sans-serif",
    lineHeight: "140%",
    fontStyle: "normal",
    fontWeight: "normal",

    fontWeight: "800",
    color: "#4d4d4d",
  },
  paraSpan: {
    color: "#aeaeae",
    fontWeight: "300",
    fontSize: "smaller",
  },
  btnDiv: {
    marginTop: "40px",
  },
  imgpara: {
    width: "100px",
    marginTop: "10%",
  },
}));
