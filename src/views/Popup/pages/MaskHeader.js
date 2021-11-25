import React, { useEffect, useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { ethers } from "ethers";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  decrypt,
  fetchERC20TokenInfo,
  fetchETHBalance,
} from "../../../Utils/Utils";
import Btnsvg from "../../../Assets/plusBtn.svg";
import importAccont from "../../../Assets/importAccount.svg";
import connectIcon from "../../../Assets/connectIcon.svg";
import support from "../../../Assets/support.svg";
import settings from "../../../Assets/settings.svg";
import "./CreatedMask.css";
import Buttons from "../Components/Buttons";

import Button from "@mui/material/Button";
import Popover from "../Components/Popover";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
// const Tx = require('ethereumjs-tx');
import { useHistory } from "react-router";
import Web3 from "web3";
import { EthereumIcon, MetaMaskIcon } from "../../../Assets";
import { Typography } from "@mui/material";
import DropDown from "../Components/DropDown";
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

  const [network, setNetwork] = useState("rinkeby");
  const [encryptedData, setEncryptedData] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [customTokens, setCustomTokens] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const history = useHistory();

  const handleChange = (event) => {
    setNetwork(event.target.value);
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
      <Box sx={{ maxHeight: "100vh" }}>
        <div
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

          <div>
            <Select value={network} onChange={handleChange}>
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

          <div>
            <div
              style={{
                marginTop: "10px",
                marginRight: "12px",
                cursor: "pointer",
              }}
              onClick={myFunction}
              className="dropbtn"
            >
              <div
                className="identicon"
                style={{ height: "32px", width: "32px", borderRadius: "16px" }}
              >
                <div
                  style={{
                    borderRadius: "50px",
                    overflow: "hidden",
                    padding: "0px",
                    margin: "0px",
                    width: "32px",
                    height: "32px",
                    display: "inline-block",
                    background: "rgb(24, 111, 242)",
                  }}
                >
                  <svg x="0" y="0" width="32" height="32">
                    <rect
                      x="0"
                      y="0"
                      width="32"
                      height="32"
                      transform="translate(-0.17735677164861813 -0.16094307714567288) rotate(366.4 16 16)"
                      fill="#C81429"
                    ></rect>
                    <rect
                      x="0"
                      y="0"
                      width="32"
                      height="32"
                      transform="translate(-12.707245407161652 -5.515322276961629) rotate(299.7 16 16)"
                      fill="#033E5E"
                    ></rect>
                    <rect
                      x="0"
                      y="0"
                      width="32"
                      height="32"
                      transform="translate(13.766797707558483 -25.677791929681067) rotate(401.7 16 16)"
                      fill="#F5F500"
                    ></rect>
                  </svg>
                </div>
              </div>
            </div>
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
        <div
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
        >
          <button className="icon-button eth-overview__button">
            <div className="icon-button__circle">
              <svg
                width="17"
                height="21"
                viewBox="0 0 17 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.62829 14.3216C8.65369 14.2947 8.67756 14.2664 8.69978 14.2368L12.8311 10.1286C13.0886 9.87975 13.1913 9.51233 13.1 9.16703C13.0087 8.82174 12.7375 8.55207 12.3903 8.46129C12.0431 8.37051 11.6736 8.47268 11.4233 8.72869L8.89913 11.2387L8.89913 1.3293C8.90647 0.970874 8.71837 0.636511 8.40739 0.455161C8.0964 0.273811 7.71112 0.27381 7.40014 0.45516C7.08915 0.636511 6.90105 0.970873 6.90839 1.3293L6.90839 11.2387L4.38422 8.72869C4.13396 8.47268 3.76446 8.37051 3.41722 8.46129C3.06998 8.55207 2.79879 8.82174 2.7075 9.16703C2.61621 9.51233 2.71896 9.87975 2.97641 10.1286L7.11049 14.2395C7.28724 14.4717 7.55784 14.6148 7.85026 14.6306C8.14268 14.6464 8.42727 14.5333 8.62829 14.3216Z"
                  fill="white"
                ></path>
                <rect
                  x="0.260986"
                  y="15.75"
                  width="15.8387"
                  height="2.25"
                  rx="1"
                  fill="white"
                ></rect>
              </svg>
            </div>
            <span>Buy</span>
          </button>

          <button
            className="icon-button eth-overview__button"
            data-testid="eth-overview-send"
            onClick={sendTransaction}
          >
            <div className="icon-button__circle">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.6827 0.889329C13.6458 0.890495 13.609 0.893722 13.5725 0.898996H7.76263C7.40564 0.893947 7.07358 1.08151 6.89361 1.38986C6.71364 1.69821 6.71364 2.07958 6.89361 2.38793C7.07358 2.69628 7.40564 2.88384 7.76263 2.87879H11.3124L1.12335 13.0678C0.864749 13.3161 0.760577 13.6848 0.851011 14.0315C0.941446 14.3786 1.21235 14.6495 1.55926 14.7399C1.90616 14.8303 2.27485 14.7262 2.52313 14.4676L12.7121 4.27857V7.82829C12.7071 8.18528 12.8946 8.51734 13.203 8.69731C13.5113 8.87728 13.8927 8.87728 14.2011 8.69731C14.5094 8.51734 14.697 8.18528 14.6919 7.82829V2.01457C14.7318 1.7261 14.6427 1.43469 14.4483 1.2179C14.2538 1.00111 13.9738 0.880924 13.6827 0.889329Z"
                  fill="white"
                ></path>
              </svg>
            </div>
            <span>Send</span>
          </button>

          <button className="icon-button eth-overview__button">
            <div class="icon-button__circle">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1714 9.66035V12.3786H4.68253C4.51685 12.3786 4.38253 12.2443 4.38253 12.0786V10.5478C4.38253 10.1888 3.94605 10.0116 3.69574 10.269L0.978328 13.0641C0.827392 13.2193 0.827392 13.4665 0.978328 13.6217L3.69573 16.4168C3.94604 16.6742 4.38253 16.497 4.38253 16.1379V14.6072C4.38253 14.4415 4.51685 14.3072 4.68253 14.3072H14.9992H15.0492V14.2572V9.66035C15.0492 9.14182 14.6288 8.72146 14.1103 8.72146C13.5918 8.72146 13.1714 9.14182 13.1714 9.66035ZM2.55476 2.55003H2.50476V2.60003V7.19686C2.50476 7.71539 2.92511 8.13575 3.44364 8.13575C3.96218 8.13575 4.38253 7.71539 4.38253 7.19686V4.70619C4.38253 4.5805 4.48443 4.47861 4.61012 4.47861H12.8714C13.0371 4.47861 13.1714 4.61292 13.1714 4.77861V6.30937C13.1714 6.66845 13.6079 6.84566 13.8582 6.5882L16.5756 3.79315C16.7266 3.6379 16.7266 3.39074 16.5756 3.23549L13.8582 0.440443C13.6079 0.182981 13.1714 0.360188 13.1714 0.719273V2.25004C13.1714 2.41572 13.0371 2.55003 12.8714 2.55003H2.55476Z"
                  fill="white"
                  stroke="white"
                  stroke-width="0.1"
                ></path>
              </svg>
            </div>
            <span>Send</span>
          </button>
        </div>
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
