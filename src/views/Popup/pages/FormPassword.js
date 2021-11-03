// import * as React from 'react';
import  React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormLabel } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Buttons from '../Components/Buttons';
import './Cards.css'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

function Copyright(props) {
  return (
      <>
      </>
 
  );
}

const theme = createTheme();

export default function SignIn() {


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
    
      history.push('/seedPhrase');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('password'),
      password: data.get('password'),
    });
  };



  
  return (
    <Box sx={{ minWidth: 375,height: "100vh" }}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h4" style={{fontSize:"2.5rem",marginBottom:"5%",marginRight:"5%"}}>
     Create Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <FormLabel style={{marginRight:"37%",color:"#5b5b5b",fontSize:"1rem"}}>New Password (min 8 chars)</FormLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              // value={password} onChange={(e)=>setPassword(e.target.value)}
            />
                <FormLabel style={{marginRight:"59%",color:"#5b5b5b",fontSize:"1rem"}}>Confirm Password</FormLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password} onChange={(e)=>setPassword(e.target.value)}
              type="password"
              id="password"
              autoComplete="current-password"
            />


<FormGroup>
      {/* <FormControlLabel style={{color:"#939090",fontWeight:"inherit",fontSize:"inherit"}} control={<Checkbox defaultChecked />}  /> */}
  
      <Grid item xs style={{marginRight:"10px"}}>
          <Checkbox/>
          <span style={{fontSize:"16px"}}>
          I have read and agree to the

          
                <Link href="#" variant="body2" style={{fontSize:"15px"}}>
               <span> Term of use </span>
                </Link>
                </span>
              </Grid>
              <div style={{marginRight:"60px",width:"20px",marginTop:"20px",marginBottom:"30px"}}>
              <Buttons onClick={createWallet} style={{width:"20px"}} btn="Create" className="createBtn"/>
              </div>
    </FormGroup>
  
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </Box>
  );
}