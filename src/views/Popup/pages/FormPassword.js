import * as React from 'react';
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
function Copyright(props) {
  return (
      <>
      </>
    // <Typography variant="body2" color="text.secondary" align="center" {...props}>
    //   {'Copyright © '}
    //   <Link color="inherit" href="https://mui.com/">
    //     Your Website
    //   </Link>{' '}
    //   {new Date().getFullYear()}
    //   {'.'}
    // </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
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
    <Box sx={{ minWidth: 375,height: 378 }}>
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
            />
                <FormLabel style={{marginRight:"59%",color:"#5b5b5b",fontSize:"1rem"}}>Confirm Password</FormLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
            
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
              <Buttons style={{width:"20px"}} btn="Create" className="createBtn"/>
              </div>
    </FormGroup>
  

{/*            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In

            </Button> */}
           
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </Box>
  );
}