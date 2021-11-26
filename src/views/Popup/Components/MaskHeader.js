import React, { useEffect, useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { ethers } from "ethers";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  decrypt,
  fetchERC20TokenInfo,
  fetchETHBalance,
} from "../../../Utils/Utils";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import MenuIcon from "@mui/icons-material/Menu";
import Btnsvg from "../../../Assets/plusBtn.svg";
import importAccont from "../../../Assets/importAccount.svg";
import connectIcon from "../../../Assets/connectIcon.svg";
import support from "../../../Assets/support.svg";
import settings from "../../../Assets/settings.svg";
import "./MaskHeader.css";
import Buttons from "./Buttons";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
// const Tx = require('ethereumjs-tx');
import { useHistory } from "react-router";
import Web3 from "web3";
import { EthereumIcon, MetaMaskIcon } from "../../../Assets";
import { Typography } from "@mui/material";
import DropDown from "./DropDown";
import { ETHERSCAN_API_KEY } from "../../../Constant";
import axios from "axios";

export const conciseAddress = (address) => {
  if (Web3.utils.isAddress(address)) {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  }
  return "-";
};
function MaskHeader() {
  const classes = useStyles();
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [balance, setBalance] = useState("");
  const [usd, setUSD] = useState(0);

  const [net, setnet] = useState("Hey");
  const [network, setNetwork] = useState("rinkeby");
  const [encryptedData, setEncryptedData] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [customTokens, setCustomTokens] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const history = useHistory();

  const handleChange = (event) => {
    setnet(event.target.value);
  };
  const importToken = () => {
    history.push("/Importoken");
  };
  const lockWallet = () => {
    history.push("./UnlockWallet");
  };
  useEffect(() => {
    (async () => {
      let data = localStorage.getItem("data");
      setEncryptedData(data);
      let hashedpassword = localStorage.getItem("hashedpassword");
      console.log("current value is ", hashedpassword);
      setEncryptedPassword(hashedpassword);

      const { publicKey, address, privateKey, mnemonic } = await decrypt(
        data,
        hashedpassword
      );
      setPublicKey(publicKey);
      setAddress(address);
      setPrivateKey(privateKey);
      // setSeedPhrase(mnemonic.phrase);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let tokens = localStorage.getItem("tokens");
      setEncryptedData(tokens);
      // chrome.storage.sync.get(["tokens"], async ({ tokens }) => {
      //   console.log("TOKENS==============", tokens);
      // });
      if (tokens) {
        const getCustomTokenData = await fetchERC20TokenInfo(address);
        console.log("tttt", getCustomTokenData);
        setCustomTokens(getCustomTokenData);
      }
    })();
  }, []);

  const onActivity = () => {
    history.push("/Activity");
    window.location.reload(false);
  };

  let provider;

  let providers = ethers.getDefaultProvider(network, {
    etherscan: ETHERSCAN_API_KEY,
    // infura: YOUR_INFURA_PROJECT_ID,
    // Or if using a project secret:
    // infura: {
    //   projectId: YOUR_INFURA_PROJECT_ID,
    //   projectSecret: YOUR_INFURA_PROJECT_SECRET,
    // },
    // alchemy: YOUR_ALCHEMY_API_KEY,
    // pocket: YOUR_POCKET_APPLICATION_KEY,
    // Or if using an application secret key:
    // pocket: {
    //   applicationId: ,
    //   applicationSecretKey:
    // }
  });

  useEffect(() => {
    (async () => {
      try {
        // let address = localStorage.getItem("address");
        // providers = ethers.getDefaultProvider(address, network);
        // providers.getBlockWithTransactions();
        // console.log("PROVIDER", providers);
        // const bal= await provider.fetchEthBalance()
        if (address) {
          const balance = await fetchETHBalance(address, network);
          console.log("bbbbbb", balance);

          setBalance(ethers.utils.formatUnits(balance));

          console.log("ethbalamce is", balance);
        }
        // const balance = await provider.getBalance(address);
        // setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.log("ERR===", error);
      }
    })();
  }, [balance, address]);

  useEffect(() => {
    (async () => {
      try {
        if (address) {
          //     const usd = await CrytoToUSD(address, network);

          // if (address) {
          let { data } = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
          );
          console.log("usd", data.ethereum.usd);

          setUSD(balance * data.ethereum.usd);

          console.log("usd is", usd);
        }
      } catch (error) {
        console.log("ERR===", error);
      }
    })();
  }, [balance, address]);

  const sendTransaction = async () => {
    try {
      let tx = {
        to: "0xAf78D1E8358FB1E9239eccC338D356Fb46ff681E",
        value: ethers.utils.parseEther("0.003"),
      };

      const walletMneomnic = await decrypt(encryptedData, encryptedPassword);

      await walletMneomnic.signTransaction(tx);
      let wallet = walletMneomnic.connect(provider);
      let tr = await wallet.sendTransaction(tx);
      console.log("TRANS===========", tr);
      setBalance(balance - 0.00005);

      alert("Send finished!");
    } catch (error) {
      console.log("ERROR=====", error);
    }
  };

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  return (
    <div>
      <Box>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
          // className="header"
        >
          <div className="metamask">
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0, mt: 0 }}
            >
              <MenuIcon />
            </IconButton>
          </div>

          <div>
            <FormControl fullWidth>
              {/* <InputLabel>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <span
                    style={{
                      width: "100px",
                      height: "20px",
                      margin: "0 3px 0 0",
                      opacity: "0.8",
                      fontfamily: "SFProText",
                      fontSize: "17px",
                      fontWeight: "600",
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: "normal",
                      letterSpacing: " -0.41px",
                      color: "#1a192a",
                    }}
                  >
                    {" "}
                    All networks{" "}
                  </span>

                  <div
                    style={{
                      borderRadius: "50px",
                      marginTop: "2px",
                      display: "flex",
                      border: "solid 2px #d4d2d7",
                      backgroundColor: "#e8e7e9",
                      width: "10px",
                      height: "10px",
                    }}
                  ></div>

                  <div
                    style={{
                      borderRadius: "50px",
                      marginTop: "2px",
                      display: "flex",
                      border: "solid 2px #d4d2d7",
                      backgroundColor: "#e8e7e9",
                      width: "10px",
                      height: "10px",
                      marginLeft: "-4px",
                    }}
                  ></div>

                  <div
                    style={{
                      borderRadius: "50px",
                      marginTop: "2px",
                      display: "flex",
                      border: "solid 2px #d4d2d7",
                      backgroundColor: "#e8e7e9",
                      width: "10px",
                      height: "10px",

                      marginLeft: "-4px",
                    }}
                  ></div>
                </div>
              </InputLabel> */}
              {/* 
              <Select
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                // label="Age"
                onChange={handleChange}
                IconComponent={KeyboardArrowDownIcon}
              > */}
              {/* <InputLabel htmlFor="hey">A Label</InputLabel> */}
              <Select
                value={net}
                inputProps={{
                  id: "hey",
                }}
                // value="Hey"
                onChange={handleChange}
              >
                <MenuItem value="Hey">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <span
                      style={{
                        width: "100px",
                        height: "20px",
                        margin: "0 3px 0 0",
                        opacity: "0.8",
                        fontfamily: "SFProText",
                        fontSize: "17px",
                        fontWeight: "600",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: "normal",
                        letterSpacing: " -0.41px",
                        color: "#1a192a",
                      }}
                    >
                      {" "}
                      All networks{" "}
                    </span>

                    <div
                      style={{
                        borderRadius: "50px",
                        marginTop: "2px",
                        display: "flex",
                        border: "solid 2px #d4d2d7",
                        backgroundColor: "#e8e7e9",
                        width: "10px",
                        height: "10px",
                      }}
                    ></div>

                    <div
                      style={{
                        borderRadius: "50px",
                        marginTop: "2px",
                        display: "flex",
                        border: "solid 2px #d4d2d7",
                        backgroundColor: "#e8e7e9",
                        width: "10px",
                        height: "10px",
                        marginLeft: "-4px",
                      }}
                    ></div>

                    <div
                      style={{
                        borderRadius: "50px",
                        marginTop: "2px",
                        display: "flex",
                        border: "solid 2px #d4d2d7",
                        backgroundColor: "#e8e7e9",
                        width: "10px",
                        height: "10px",

                        marginLeft: "-4px",
                      }}
                    ></div>
                  </div>
                </MenuItem>
                <MenuItem value="homestead" selected>
                  <div className="color-indicator color-indicator--filled color-indicator--border-color-mainnet color-indicator--color-mainnet color-indicator--size-lg"></div>
                  <span> Ethereum </span>
                </MenuItem>
                <MenuItem value="Binance">
                  <div className="color-indicator color-indicator--filled color-indicator--border-color-white color-indicator--color-ropsten color-indicator--size-lg"></div>
                  <span style={{ fontSize: "12px" }}> Binance Smart Chain</span>
                </MenuItem>

                <MenuItem value="Polygon">
                  <div className="color-indicator color-indicator--filled color-indicator--border-color-white color-indicator--color-kovan color-indicator--size-lg">
                    <span class="color-indicator__inner-circle"></span>
                  </div>
                  Polygon
                </MenuItem>
              </Select>
            </FormControl>

            {/* </FormControl>
            </Box> */}
          </div>

          <div>
            <div
              style={{
                marginTop: "15px",
                marginRight: "250px !important",
                cursor: "pointer",
              }}
              onClick={myFunction}
              className="dropbtn"
            ></div>
            <div id="myDropdown" className="dropdown-content">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Typography className={classes.typography}>
                  My Accounts
                </Typography>
                <Buttons
                  onClick={lockWallet}
                  className={classes.btn}
                  btn="Lock"
                />
              </div>
              <div className="account-menu__divider"></div>

              <Link to="/createAcc">
                <img
                  style={{ height: "12px", marginRight: "5px" }}
                  src={Btnsvg}
                />
                Create Account
              </Link>
              <Link to="/">
                <img
                  style={{ height: "13px", marginRight: "5px" }}
                  src={importAccont}
                />
                Import Account
              </Link>
              <Link to="/">
                <img
                  style={{ height: "12px", marginRight: "5px" }}
                  src={connectIcon}
                />
                Connet Hardware Wallet
              </Link>
              <div className="account-menu__divider"></div>
              <Link to="/">
                <img
                  style={{ height: "12px", marginRight: "5px" }}
                  src={support}
                />
                Support
              </Link>
              <Link to="/">
                <img
                  style={{ height: "12px", marginRight: "5px" }}
                  src={settings}
                />
                Setting
              </Link>
            </div>
          </div>
        </div>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",

            overflowY: "hidden",
          }}
        >
          <button class="connected-status-indicator">
            <div class="color-indicator color-indicator--color-ui-4 color-indicator--size-sm">
              <span class="color-indicator__inner-circle"></span>
            </div>
            <div class="connected-status-indicator__text">Not connected</div>
          </button>

          <Button className={classes.addressBox}>
            Account
            <br />
            {conciseAddress(address)}
            <div>
              <CopyToClipboard className={classes.clipboard} text={address}>
                <ContentCopyIcon />
              </CopyToClipboard>
            </div>
          </Button>

          <Popover />
        </div>
        <hr />
        <img src={EthereumIcon} />

        <p>
          {balance}
          ETH
        </p>
        <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "90px" }}
        ></div> */}
      </Box>
    </div>
  );
}

export default MaskHeader;
const useStyles = makeStyles((theme) => ({
  dropdown: {
    borderRadius: "100px",
    border: "1px solid #f2f3f4",
    padding: "8px 16px",
    margin: "0 4px",
    // display: "flex",
    alignItems: "center",

    width: "max-content",
  },

  addressBox: {
    background: "transparent",

    "&:hover": {
      background: "transparent !important",
    },
    // display: "flex",
    // alignItems: "center",
    border: "1px solid rgba(255, 255, 255, 0.28)",
    marginTop: "2px",
    height: "100%",
    width: "180px",
    borderRadius: 10,
    color: "#878181 !important",
    // marginLeft: "20%",
    marginRight: "50px",
  },
  select1: {
    height: "40px",
    width: "40px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderRadius: "50%",
    borderWidth: "2px",
    borderColor: "#037dd6",
  },
  innerSelect: {
    borderRadius: "50px",
    overflow: "hidden",
    padding: "0px",
    margin: "0px",
    width: "32px",
    height: "32px",
    display: "inline-block",
    background: "rgb(24, 111, 242)",
  },
  typography: {
    // marginRight: "180px",
    paddingTop: "18px",
    paddingBottom: "18px",
  },
  btn: {
    fontsize: "0.75rem !important",
    fontFamily: "Euclid, Roboto, Helvetica, Arial, sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    marginTop: "12.5px !important",
    fontFamily: "Euclid, Roboto, Helvetica, Arial, sans-serif !important",
    width: "40px !important",
    height: "30px",
    color: "#6a737d",
    backgroundColor: "transparent !important",
    border: "1px solid #5d5d5d !important",
    borderRadius: "20px !important",
    fontSize: "0.82rem !important",
    marginLeft: " 100px !important",
    textTransform: "capitalize !important",
  },
  clipboard: {
    marginTop: "130%",
    height: "0.9rem !important",
    fontSize: "1.2rem !important",
    transition: "none !important",
    marginLeft: "2px",
  },
}));
