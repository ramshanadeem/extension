import { hashMessage } from '@ethersproject/hash';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { CREATE_WALLET } from '../../Redux/ActionType';
import { decrypt } from '../../Utils/Utils';

function SeedPhrase() {
     const dispatch = useDispatch()
    const history = useHistory();
    const [mnemonics,setMnemonics]=useState('')
    const [encryptedData,setEncryptedData]=useState('')
    const [encryptedPassword,setEncryptedPassword]=useState('')
    // const {data,hashedpassword} = useSelector(({WalletEncrypted}) => WalletEncrypted?.walletEncrypt)
    // console.log("hashedpassword",data,hashedpassword)

    useEffect(() => {
 
chrome.storage.sync.get(
  ['data'],
  async({data})=>{
  console.log("current data is",data)
  setEncryptedData(data)
  
 chrome.storage.sync.get(
   ['hashedpassword'],
   async({hashedpassword})=>{
    console.log("current value is ",hashedpassword)
    setEncryptedPassword(hashedpassword)

 const { mnemonic } = await decrypt(data, hashedpassword);
            console.log('mnemonic' ,mnemonic);
            setMnemonics(mnemonic.phrase);
   }
   );
  });
  
        dispatch({
            type:CREATE_WALLET,
            payload:{
                isLoggedIn:true,
            }
        });
      
    }, [])
    return (
        <div style={{width:"100%",height:"70%"}}>
        <h1>Seed Phrase</h1>
        <h2>{mnemonics}</h2>
  
        <Link to='/dashboard'>
          <button>Next</button>
        </Link>
      </div>
    )
}

export default SeedPhrase
