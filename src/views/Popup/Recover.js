import { ethers } from 'ethers'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { CREATE_WALLET, IMPORT_WALLET } from '../../Redux/ActionType'

function Recover() {
    const [password, setPassword] = useState('')
    const [seedPhrase, setSeedPhrase] = useState('')
    const history=useHistory()
    const dispatch= useDispatch()
    const onRecover=async()=>{
        let mnemonicWallet = ethers.Wallet.fromMnemonic(seedPhrase)
        let hashedpassword=ethers.utils.hashMessage(password)
        let encryptPromise=await mnemonicWallet.encrypt(hashedpassword)
        dispatch({
            type: IMPORT_WALLET,
            payload: {
              hashedpassword,
              data: encryptPromise,
              walletImported: true,
            },
          });
          dispatch({
            type: CREATE_WALLET,
            payload: {
              isLoggedIn: true,
            },
          });
          chrome.storage.sync.set({data:encryptPromise},()=>{
            console.log("your encrypt promise"+encryptPromise);
          });
          chrome.storage.sync.set({hashedpassword},()=>{
            console.log("your hashedpassword is "+hashedpassword)
          })
          history.push('/dashboard');
    };

    return (
        <div>
            <h3>Enter seed phrase</h3>
            <input value={seedPhrase} onChange={e=>setSeedPhrase(e.target.value)}></input>
            <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Enter Password'
      />

      <button onClick={onRecover}>Recover</button>

        </div>
    )
}

export default Recover
