import { NetworkCell } from "@mui/icons-material";
import axios from "axios";
import { ethers } from "ethers";
import {
  ETHERSCAN_API,
  ETHERSCAN_API_KEY,
  ETHERSCAN_MAINNET_API,
  ETHERSCAN_RINKEBY_API,
} from "../Constant";
export const decrypt = async (data, hashedpassword) => {
  console.log("DECRYPT=============", data, hashedpassword);
  let decryptedData = await ethers.Wallet.fromEncryptedJson(
    data,
    hashedpassword
  );
  console.log("DECRYPTED============", decryptedData);
  return decryptedData;
};

export const fetchRates = async (coinId) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
  );

  let id = coinId;

  return data[id.toLowerCase()].usd;
};

export const fetchERC20Balance = async (address, contractAddress, netowrk) => {
  let BASEURL =
    netowrk === "homestead" ? ETHERSCAN_MAINNET_API : ETHERSCAN_RINKEBY_API;
  const { data } = await axios.get(
    `${BASEURL}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`
    // `${BASEURL}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${RINKEBY_API_KEY}`
  );
  return data;
};

export const fetchTxHistory = async (address, netowrk) => {
  let BASEURL =
    netowrk === "homestead" ? ETHERSCAN_MAINNET_API : ETHERSCAN_RINKEBY_API;
  const { data } = await axios.get(
    `${BASEURL}?module=account&action=txlist&address=${address}&sort=asc&apikey=${ETHERSCAN_API_KEY}`
  );
  return data;
};

export const fetchERC20TxHistory = async (address, netowrk) => {
  let BASEURL =
    netowrk === "homestead" ? ETHERSCAN_MAINNET_API : ETHERSCAN_RINKEBY_API;
  const { data } = await axios.get(
    `${BASEURL}?module=account&action=tokentx&address=${address}&sort=asc&apikey=${ETHERSCAN_API_KEY}`
  );
  return data;
};

export const fetchERC20TokenInfo = async (address, netowrk) => {
  let BASEURL =
    netowrk === "homestead" ? ETHERSCAN_MAINNET_API : ETHERSCAN_RINKEBY_API;
  const { data } = await axios.get(
    `${BASEURL}?module=account&action=tokentx&address=${address}&sort=asc&apikey=${ETHERSCAN_API_KEY}`
  );
  return data;
};

export const fetchETHBalance = async (address, network) => {
  let BASEURL =
    network === "homestead" ? ETHERSCAN_MAINNET_API : ETHERSCAN_RINKEBY_API;
  const { data } = await axios.get(
    // `/${BASEURL}?module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`
    // `${BASEURL}?module=account&action=balance&&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`

    `https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=X5WDTQXXFFTJD7KDS7TGQA8YBI7QEPUNUX`
  );

  return data.result;
};
export const CrytoToUSD = async (adddress, network) => {
  let BASEURL =
    network === "homestead" ? ETHERSCAN_MAINNET_API : ETHERSCAN_RINKEBY_API;
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
  );
  return data.result;
};
