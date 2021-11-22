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
import { useHistory } from "react-router";

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

const Activity = () => {
  const classes = useStyles();
  const [publicKey, setPublicKey] = useState("");
  const history = useHistory();
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
  const toAssets = () => {
    history.push("/createdMask");
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
    <div style={{ height: 700, width: 400 }}>
      <MaskHeader />
      <div style={{ marginTop: "15%" }}>
        <ul className="tabs__list home__tabs">
          <li className="tab home__tab">
            {/* <NavLink exact className="link" to="/createdMask"> */}
            <Button className="asset" onClick={toAssets}>
              Assets
            </Button>
            {/* </NavLink> */}
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
