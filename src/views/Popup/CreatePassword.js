import { ethers } from 'ethers'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Button } from 'semantic-ui-react'
import { CREATE_WALLET_ENCRYTED } from '../../Redux/ActionType'

function CreatePassword() {
    const [password,setPassword]=useState('')
    const dispatch = useDispatch()
    const history=useHistory()
    const createWallet=async()=>{
        let randomSeed= ethers.Wallet.createRandom()
        console.log("randomseed.menmonics",randomSeed.mnemonic)
        console.log("randomSeed.address",randomSeed.address)
        let hashedpassword= ethers.utils.hashMessage(password)
        console.log("hashedpassword",hashedpassword)
        let encryptPromise = await randomSeed.encrypt(hashedpassword);

        console.log('ENCRYOPTED====', encryptPromise);
    chrome.storage.sync.set({data:encryptPromise},()=>{
      console.log("value is set to the data is "+encryptPromise)
    });
    chrome.storage.sync.set({hashedpassword},()=>{
      console.log("the value is set the password is"+ hashedpassword)
    });
        // dispatch({
        //   type: CREATE_WALLET_ENCRYTED,
        //   payload: {
        //     hashedpassword,
        //     data: encryptPromise,
        //     walletCreated: true,
        //   },
        // });
    
        history.push('/seedPhrase');
    }
    return (
        <div>
            <input placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={createWallet}>Submit</Button>
        </div>
    )
}

export default CreatePassword
