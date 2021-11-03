import { hashMessage } from '@ethersproject/hash';
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { CREATE_WALLET } from '../../Redux/ActionType';
import { decrypt } from '../../Utils/Utils';
import Buttons from "../Popup/Components/Buttons";
import Button from '@mui/material/Button';
import CardPhrase from './pages/CardPhrase';
import "./pages/Cards.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
        <div style={{ height:600,width:400}}>
          <div>
            <Typography  style={{display:"flex",marginTop:"10px",textDecoration:"none" ,marginLeft:"5%"}}>
              <Link  to="/create">
              <Button  startIcon={<ArrowBackIcon />}>
        Back
      </Button>
             
              
              </Link>
           </Typography>
          </div>
          <Typography component="h1" variant="h4" style={{fontSize:"2.5rem",marginBottom:"5%",marginRight:"5%",marginTop:"40px"}}>
          Secret Recovery Phrase
          </Typography>
          <div style={{marginTop:"40px"}}>
   <CardPhrase content={mnemonics}/>
   </div>
        {/* <p>{mnemonics}</p> */}
        <div style={{marginTop:"30px"}}>
          <Link to='/confirmPhrase'>
        <Buttons className="createBtn"  btn="Next"/>
        </Link>
        </div>
        {/* <Link to='/dashboard'>
          <button>Next</button>
        </Link> */}
      </div>
    )
}

export default SeedPhrase
