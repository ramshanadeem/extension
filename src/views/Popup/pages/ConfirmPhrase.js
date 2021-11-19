import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { CREATE_WALLET } from "../../../Redux/ActionType";
import { decrypt } from "../../../Utils/Utils";
import Buttons from "../Components/Buttons";
import Button from "@mui/material/Button";
import "./Cards.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { display } from "@mui/system";
function ConfirmPhrase() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [mnemonics, setMnemonics] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [showResults, setShowResults] = useState([]);

  const onc = (k) => {
    //includes check the array elements are present or not
    // condition is that check if there is not showresult then setshowResult()
    //else
    // once result show then delete it on next click
    if (!showResults.includes(k)) {
      setShowResults([...showResults, k]);
    } else {
      let findIndex = showResults.findIndex((sr) => sr == k);
      let removed = showResults.splice(findIndex, 1);
      let res = showResults.filter((sr) => sr !== removed[0]);
      console.log(removed, res);
      setShowResults(res);
    }
  };

  const [shuffle, setshuffle] = useState([]);
  const [open, setOpen] = useState(false);

  // const {data,hashedpassword} = useSelector(({WalletEncrypted}) => WalletEncrypted?.walletEncrypt)
  // console.log("hashedpassword",data,hashedpassword)

  useEffect(() => {
    (async () => {
      let data = localStorage.getItem("data");
      setEncryptedData(data);
      let hashedpassword = localStorage.getItem("hashedpassword");
      console.log("current value is ", hashedpassword);
      setEncryptedPassword(hashedpassword);

      const { mnemonic } = await decrypt(data, hashedpassword);
      console.log("mnemonic", mnemonic);
      setMnemonics(mnemonic.phrase);

      dispatch({
        type: CREATE_WALLET,
        payload: {
          isLoggedIn: true,
        },
      });
    })();
  }, []);

  // useEffect(() => {
  //   localStorage.getItem(["data"], async ({ data }) => {
  //     console.log("current data is", data);
  //     setEncryptedData(data);

  //     localStorage.getItem(["hashedpassword"], async ({ hashedpassword }) => {
  //       console.log("current value is ", hashedpassword);
  //       setEncryptedPassword(hashedpassword);

  //       const { mnemonic } = await decrypt(data, hashedpassword);
  //       console.log("mnemonic", mnemonic);
  //       setMnemonics(mnemonic.phrase);
  //     });
  //   });

  //   dispatch({
  //     type: CREATE_WALLET,
  //     payload: {
  //       isLoggedIn: true,
  //     },
  //   });
  // }, []);
  let Split = mnemonics.split(" ");
  useEffect(() => {
    let Split = mnemonics.split(" ");
    // const fn=()=>{

    let n = Split.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = Split[i];
      Split[i] = Split[j];
      Split[j] = tmp;
    }
    console.log("SPLLIT========", Split);
    setshuffle(Split);
  }, [mnemonics]);

  const handleClickOpen = () => {
    let Split = mnemonics.split(" ");
    // setshuffle(Split.join(" "));
    console.log(Split.join(" "));
    console.log("sseeeet", shuffle);
    console.log(showResults, "afterrrr");
    if (showResults.join(" ") == mnemonics) {
      console.log("yesequal");
      history.push("/createdMask");
    } else {
      console.log("notequal", shuffle);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setShowResults([" "]);
  };
  return (
    <div style={{ height: 700, width: 400 }}>
      <div>
        <Typography
          style={{
            display: "flex",
            marginTop: "10px",
            textDecoration: "none",
            marginLeft: "5%",
          }}
        >
          <Link to="/seedPhrase">
            <Button startIcon={<ArrowBackIcon />}>Back</Button>
          </Link>
        </Typography>
      </div>
      <Typography
        component="h1"
        variant="h4"
        style={{
          fontSize: "2.5rem",
          marginBottom: "5%",
          marginRight: "5%",
          marginTop: "40px",
        }}
      >
        Confirm your Secret Recovery Phrase
      </Typography>
      <Typography
        style={{
          marginBottom: "5%",
          marginRight: "2%",
          marginTop: "40px",
          marginLeft: "2%",
        }}
      >
        Please select each phrase in order to make sure it is correct.
      </Typography>
      <div className="phraseBox" style={{ marginTop: "40px" }}>
        {showResults.map((k) => {
          return <Button>{k}</Button>;
        })}
      </div>

      <div>
        {shuffle.map((value) => {
          return (
            <Button className="activebtn" onClick={() => onc(value)}>
              {value}
            </Button>
          );
        })}
      </div>

      <div style={{ marginTop: "30px" }}>
        {/* <Buttons onClick={confirmPhrase} className="createBtn" btn="Confirm" /> */}
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Slide in alert dialog
        </Button> */}
        {/* <Buttons
          // className="createBtn"
          disabled={showResults.length != 12}
          onClick={handleClickOpen}
          
        /> */}
        <Buttons
          disabled={showResults.length != 12}
          onClick={handleClickOpen}
          style={{ width: "20px" }}
          btn="Confirm"
          className="createBtn"
        />
      </div>

      <Dialog
        className="dialog"
        // style={{position:"absolute"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Not Matched
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmPhrase;
