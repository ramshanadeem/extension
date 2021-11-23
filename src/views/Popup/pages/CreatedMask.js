import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ethers } from "ethers";
import {
  CrytoToUSD,
  decrypt,
  fetchERC20TokenInfo,
  fetchETHBalance,
  fetchERC20TxHistory,
  fetchTxHistory,
} from "../../../Utils/Utils";
import Btnsvg from "../../../Assets/plusBtn.svg";
import importAccont from "../../../Assets/importAccount.svg";
import connectIcon from "../../../Assets/connectIcon.svg";
import support from "../../../Assets/support.svg";
import settings from "../../../Assets/settings.svg";
import "./CreatedMask.css";
import Buttons from "../Components/Buttons";
import { NavLink } from "react-router-dom";
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
import MaskHeader from "./MaskHeader";

export const conciseAddress = (address) => {
  if (Web3.utils.isAddress(address)) {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  }
  return "-";
};
// import { REMOVE_MNEMONIC } from '../../redux/actionTypes';

const CreatedMask = () => {
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
  const [txHistory, setTxHistory] = useState([]);
  const [isAsset, setIsAsset] = useState(true);
  const [ERC20History, setERC20History] = useState([]);
  const history = useHistory();

  // const handleChange = (event) => {
  //   setNetwork(event.target.value);
  // };
  const importToken = () => {
    history.push("/Importoken");
  };
  // const lockWallet = () => {
  //   history.push("./UnlockWallet");
  // };
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
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let tokens = localStorage.getItem("tokens");
      setEncryptedData(tokens);

      if (tokens) {
        const getCustomTokenData = await fetchERC20TokenInfo(address);
        console.log("tttt", getCustomTokenData);
        setCustomTokens(getCustomTokenData);
      }
    })();
  }, []);

  const onActivity = () => {
    setIsAsset(false);
  };

  let provider;

  let providers = ethers.getDefaultProvider(network, {
    etherscan: ETHERSCAN_API_KEY,
  });

  useEffect(() => {
    (async () => {
      try {
        if (address) {
          const balance = await fetchETHBalance(address, network);
          console.log("bbbbbb", balance);

          setBalance(ethers.utils.formatUnits(balance));

          console.log("ethbalamce is", balance);
        }
      } catch (error) {
        console.log("ERR===", error);
      }
    })();
  }, [balance, address]);

  useEffect(() => {
    (async () => {
      try {
        if (address) {
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

  // activity
  const toAssets = () => {
    setIsAsset(true);
    console.log("isassets=====", isAsset);
    // history.push("/createdMask");
  };
  useEffect(() => {
    if (address) {
      (async () => {
        const txERC20Hist = await fetchERC20TxHistory(address, network);

        setERC20History([...txERC20Hist.result]);
      })();
    }
  }, [address, network]);

  useEffect(() => {
    if (address) {
      (async () => {
        const txHist = await fetchTxHistory(address, network);

        setTxHistory([...txHist.result]);
      })();
    }
  }, [address, network]);

  return (
    // <div style={{ height: "100vh" }}>
    <Box sx={{ maxHeight: "100vh" }}>
      <MaskHeader />

      <div>
        <div style={{ marginTop: "15%" }}>
          <ul style={{ paddingLeft: "0" }} className="tabs__list home__tabs">
            <li
              className="tab home__tab tab--active"
              data-testid="home__asset-tab"
            >
              <Button className="asset" onClick={toAssets}>
                Assets
              </Button>
            </li>
            <li className="tab home__tab ">
              <NavLink
                to="/Activity"
                style={(isActive) => ({
                  color: isActive ? "blue" : "gray",
                  textDecoration: "none",
                })}
                style={{
                  fontsize: "1.875rem",
                  fontWeight: "500",
                  textDecoration: "none",
                  color: "gray",
                  textTransform: "uppercase",
                  lineHeight: "1.75",
                  padding: "6px 8px",
                }}
                onClick={onActivity}
              >
                Activity
                {/* <Button onClick={onActivity}>Activity</Button> */}
              </NavLink>
            </li>
          </ul>

          {isAsset == true ? (
            <div>
              {customTokens.map((ct) => {
                <p>
                  {ct?.balance} {ct.symbol}
                </p>;
              })}
              <div>
                <Typography
                  style={{
                    marginRight: "50%",
                    height: "40px",
                    fontsize: "12px",
                  }}
                >
                  Total Balance in USD:${usd}
                </Typography>
              </div>
            </div>
          ) : null}
        </div>

        {/* //  activity
         */}
        {isAsset == false ? (
          <div>
            {txHistory.map((v, k) => {
              if (address === v.from) {
                return <p key={k}>{v.from}</p>;
              } else {
                return (
                  <p style={{ fontSize: "12px" }}> you recieved:{v.value}</p>
                );
              }
            })}

            {ERC20History.map((v, k) => {
              if (address === v.from) {
                return <p key={k}>you send {v.value}</p>;
              } else {
                return (
                  <p style={{ fontSize: "12px" }}> you recieved:{v.value}</p>
                );
              }
            })}
          </div>
        ) : null}

        <div className="ImpToken">
          <p className="typo">
            Need help? Contact{" "}
            <Button style={{ fontVariant: "small-caps" }}>
              MetaMask Support
            </Button>
          </p>
        </div>
        <hr />

        <div className="ImpToken">
          <p className="typo"> Don't see your token?</p>
          <Button onClick={importToken}>Import token</Button>
          <p className="typo">
            Need help? Contact{" "}
            <Button style={{ fontVariant: "small-caps" }}>
              MetaMask Support
            </Button>
          </p>
        </div>
      </div>
    </Box>
  );
};
export default CreatedMask;
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
      background: "transparent",
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
}));
