import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { decrypt } from "../../../Utils/Utils";
import "./CreatedMask.css";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Popover from "../Components/Popover";

import { makeStyles } from "@material-ui/core/styles";
// const Tx = require('ethereumjs-tx');
import { useHistory } from "react-router";
import Web3 from "web3";
import { EthereumIcon, MetaMaskIcon } from "../../../Assets";
import { Typography } from "@mui/material";

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
  const [network, setNetwork] = useState("rinkeby");
  const [encryptedData, setEncryptedData] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [customTokens, setCustomTokens] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const history = useHistory();
  const importToken = () => {
    history.push("/Importoken");
  };
  const hello = () => {
    alert("helooo");
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
      if (tokens) {
        // const getCustomTokenData = await fetchERC20TokenInfo(address)
        setCustomTokens(tokens);
      }
    })();
  }, []);
  let provider;

  useEffect(() => {
    (async () => {
      try {
        provider = ethers.getDefaultProvider(network);
        provider.getBlockWithTransactions();
        console.log("PROVIDER", provider);
        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.log("ERR===", error);
      }
    })();
  }, [network, balance]);

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

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
        className="header"
      >
        <div className="metamask">
          <img
            height="32px"
            src={MetaMaskIcon}
            // src="./images/logo/metamask-logo-horizontal.svg"
            className="app-header__metafox-logo--horizontal"
            alt=""
          />
        </div>
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
        <div
          style={{ marginTop: "10px", marginRight: "12px", cursor: "pointer" }}
          onClick={hello}
        >
          <div className="identicon__address-wrapper">
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-between",
        }}
      >
        {/* <div className="account">Account</div> */}

        <Button style={{ marginLeft: "28%" }} className={classes.addressBox}>
          Account
          <br />
          {conciseAddress(address)}
          <div
            style={{ marginTop: "23px", marginLeft: "2px" }}
            // className="selected-account__copy"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 0H1H9V1H1V9H0V0ZM2 2H11V11H2V2ZM3 3H10V10H3V3Z"
                fill="#989a9b"
              ></path>
            </svg>
          </div>
        </Button>

        <Popover />
      </div>
      <hr />
      <img src={EthereumIcon} />
      <p>{balance} ETH</p>
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

        <button
          className="icon-button eth-overview__button"
          // data-testid="eth-overview-send"
        >
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
      <div style={{ marginTop: "15%" }}>
        <ul style={{ paddingLeft: "0" }} className="tabs__list home__tabs">
          <li
            className="tab home__tab tab--active"
            data-testid="home__asset-tab"
          >
            <Button className="asset">Assets</Button>
          </li>
          <li className="tab home__tab ">
            <NavLink exact className="link" to="/Activity">
              <Button>Activity</Button>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* <h4>Tokens In Wallet</h4> */}
      {customTokens.map((ct) => (
        <p>
          {ct?.balance} {ct.symbol}
        </p>
      ))}
      {/* <p>LINK BALANCE: ${linkBalance} LINK</p> */}
      <div>
        <Typography style={{ marginRight: "50%", height: "40px" }}>
          Total Balance in USD: ${totalBalance}
        </Typography>
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
    // display: "flex",
    alignItems: "center",
    border: "1px solid rgba(255, 255, 255, 0.28)",
    height: "100%",
    width: "180px",
    borderRadius: 10,
    color: "#878181 !important",
    marginLeft: "20%",
  },
}));
