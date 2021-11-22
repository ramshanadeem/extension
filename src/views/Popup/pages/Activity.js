import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  decrypt,
  fetchERC20Balance,
  fetchERC20TokenInfo,
  fetchERC20TxHistory,
  fetchETHBalance,
  fetchTxHistory,
} from "../../../Utils/Utils";
import "./CreatedMask.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
// const Tx = require('ethereumjs-tx');
import { NavLink } from "react-router-dom";
import Web3 from "web3";
import { EthereumIcon } from "../../../Assets";
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

const Activity = () => {
  const classes = useStyles();
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [balance, setBalance] = useState("");
  const [network, setNetwork] = useState("rinkeby");
  const [encryptedData, setEncryptedData] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [txHistory, setTxHistory] = useState([]);
  const [ERC20History, setERC20History] = useState([]);
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

  useEffect(() => {
    if (address) {
      (async () => {
        const txHist = await fetchTxHistory(address, network);
        const txERC20Hist = await fetchERC20TxHistory(address, network);

        setTxHistory([...txHist.result]);

        setERC20History([...txERC20Hist.result]);
      })();
    }
  }, [address, network]);

  // useEffect(() => {
  //   if (address) {
  //     (async () => {
  //       const txHist = await fetchTxHistory(address, network);
  //       const txERC20Hist = await fetchERC20TxHistory(address, network);

  //       setTxHistory([...txHist.result, ...txERC20Hist.result]);
  //     })();
  //   }
  // }, [address, network]);

  return (
    <div style={{ height: 700, width: 400 }}>
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
        {/* <div className="account">Account</div> */}

        <Button className={classes.addressBox}>
          Account
          <br />
          {conciseAddress(address)}
        </Button>

        {/* <div className="address">{address}</div> */}
      </div>
      <hr />
      <img src={EthereumIcon} />
      <p>{balance} ETH</p>
      <div
        style={{ display: "flex", flexDirection: "row", marginLeft: "90px" }}
      >
        <button class="icon-button eth-overview__button">
          <div class="icon-button__circle">
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
          class="icon-button eth-overview__button"
          data-testid="eth-overview-send"
          onClick={sendTransaction}
        >
          <div class="icon-button__circle">
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
          class="icon-button eth-overview__button"
          data-testid="eth-overview-send"
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
        <ul className="tabs__list home__tabs">
          <li className="tab home__tab">
            <NavLink exact className="link" to="/createdMask">
              <Button className="asset">Assets</Button>
            </NavLink>
          </li>
          <li
            className="tab home__tab tab--active home__tab--active "
            data-testid="home__activity-tab"
          >
            <Button>Activity</Button>
          </li>
        </ul>
        {/* <p>{txHistory.result.value}</p> */}
        <p>Transaction history </p>
        {txHistory.map((v, k) => {
          if (address === v.from) {
            return <p key={k}>{v.from}</p>;
          } else {
            return <p style={{ fontSize: "12px" }}> you recieved:{v.value}</p>;
          }
        })}
        <p>ETH Transaction history </p>
        {ERC20History.map((v, k) => {
          if (address === v.from) {
            return <p key={k}>you send {v.value}</p>;
          } else {
            return <p style={{ fontSize: "12px" }}> you recieved:{v.value}</p>;
          }
        })}
      </div>
      <div className="ImpToken">
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
export default Activity;
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
  },
}));
