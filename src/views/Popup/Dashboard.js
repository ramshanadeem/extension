import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { decrypt } from "../../Utils/Utils";

// const Tx = require('ethereumjs-tx');

// import { REMOVE_MNEMONIC } from '../../redux/actionTypes';

const Dashboard = () => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [balance, setBalance] = useState("");
  const [network, setNetwork] = useState("rinkeby");
  const [encryptedData, setEncryptedData] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");

  // const { data, hashedPassword } = useSelector(
  //   ({ walletEncrypted }) => walletEncrypted?.walletEncrypted
  // );

  useEffect(() => {
    // var customHttpProvider = new ethers.providers.JsonRpcProvider(
    //   'https://rinkeby.infura.io/v3/2107de90a19f4dd69c0eef59805a707e'
    // );
    // customHttpProvider.getBlockNumber().then(result => {
    //   console.log('Current block number: ' + result);
    // });
    // const provider = ethers.getDefaultProvider(
    //   '2107de90a19f4dd69c0eef59805a707e'
    // );
    // console.log('PROVIDER====', provider);
    // let network = {
    //   name: 'rinkbey',
    //   chainId: 4,
    //   // ensAddress: '',
    // };
    // const itx = new ethers.providers.InfuraProvider({
    //   network,
    //   apiKey: '2107de90a19f4dd69c0eef59805a707e',
    // });
    // console.log('PROVIDER===', itx);
  }, []);

  useEffect(() => {
    (async () => {
      let data = localStorage.getItem("data");
      setEncryptedData(data);
      let hashedpassword = localStorage.getItem("hashedpassword");
      console.log("current value is ", hashedpassword);
      setEncryptedPassword(hashedpassword);
      // chrome.storage.sync.get(['data'], async ({ data }) => {
      //   console.log('Value currently is ' + data);
      //   setEncryptedData(data);

      //   chrome.storage.sync.get(
      //     ['hashedpassword'],
      //     async ({ hashedpassword }) => {
      //       console.log('Value currently is '+ hashedpassword);
      //       setEncryptedPassword(hashedpassword);

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

  // useEffect(() => {
  //   //get the Provider Etherscan
  //   let etherscanProvider = new ethers.providers.EtherscanProvider(
  //     network || 'rinkeby'
  //   );

  //   //Get the transaction history
  //   etherscanProvider.getHistory(address).then(history => {
  //     history.forEach(tx => {
  //       console.log('tx================', tx);
  //     });
  //   });
  // }, []);

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
      <h3>Public Key: {publicKey}</h3>
      <h3>PRIVATE KEY: {privateKey}</h3>
      <h3>Address: {address}</h3>
      {/* <h3>SEED PHRASE: {seedPhrase}</h3> */}
      <select onChange={(e) => setNetwork(e.target.value)}>
        <option value="homestead">Ethereum Mainnet</option>
        <option value="rinkeby" selected>
          Rinkeby
        </option>
        <option value="ropsten">Ropsten</option>
        <option value="kovan">Kovan</option>
        <option value="goerli">Goerili</option>
      </select>
      <p>Your Balance: {balance} ETH</p>

      <button onClick={sendTransaction}>Send</button>
    </div>
  );
};

export default Dashboard;

// melt confirm jump know romance arm audit flush lake select energy glad
