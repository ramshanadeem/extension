import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Cards from "./pages/Cards";
import arrow from "../../Assets/arrow.svg";
import plus from "../../Assets/plus.svg";
import Wallet from "../../Redux/Reducers/Wallet";
import "./Welcome.css";
function Welcome(heading, para) {
  const history = useHistory();

  return (
    <>
      <div className="welcomediv">New to MetaMask?</div>

      <div
        style={{
          height: 300,
          paddingRight: "5px",
          paddingLeft: "5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Cards
          image={arrow}
          heading="No, I already have a Secret Recovery Phrase"
          para="Import your existing wallet using a Secret Recovery Phrase"
          btn="Import Wallet"
        />
        <Cards
          image={plus}
          heading="Yes, let’s get set up!"
          para="This will create a new wallet and Secret Recovery Phrase"
          btn="Create Wallet"
        />
      </div>
    </>
  );
}

export default Welcome;
