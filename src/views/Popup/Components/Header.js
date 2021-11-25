import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MetaMaskIcon } from "../../../Assets";

function Header() {
  const [network, setNetwork] = useState("rinkeby");

  const handleChange = (event) => {
    setNetwork(event.target.value);
  };

  return (
    <div>
      <div style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          className="header"
        >
          <div className="metamask">
            <img
              height="32px"
              src={MetaMaskIcon}
              className="app-header__metafox-logo--horizontal"
              alt=""
            />
          </div>
          <div style={{ marginRight: "10px" }}>
            <Select
              style={{ right: "80px" }}
              value={network}
              onChange={handleChange}
            >
              <MenuItem value="homestead">
                <div className="color-indicator color-indicator--filled color-indicator--border-color-mainnet color-indicator--color-mainnet color-indicator--size-lg"></div>
                <span> Ethereum Mainnet </span>
              </MenuItem>
              <MenuItem value="rinkeby" selected>
                <div class="color-indicator color-indicator--filled color-indicator--border-color-white color-indicator--color-ropsten color-indicator--size-lg">
                  <span class="color-indicator__inner-circle"></span>
                </div>
                Ropsten Test Network
              </MenuItem>

              <MenuItem value="ropsten">
                <div class="color-indicator color-indicator--filled color-indicator--border-color-white color-indicator--color-kovan color-indicator--size-lg">
                  <span class="color-indicator__inner-circle"></span>
                </div>
                Kovan
              </MenuItem>
              <MenuItem value="kovan">
                <div class="color-indicator color-indicator--filled color-indicator--border-color-rinkeby color-indicator--color-rinkeby color-indicator--size-lg">
                  <span class="color-indicator__inner-circle"></span>
                </div>
                Rinkeby Test Network
              </MenuItem>

              <MenuItem value="goerli">
                <div
                  class="  color-indicator color-indicator--filled
              color-indicator--border-color-goerli color-indicator--color-goerli
              color-indicator--size-lg Goerili"
                >
                  <span class="color-indicator__inner-circle"></span>
                </div>
                Goerli Test Network
              </MenuItem>

              <MenuItem value="localhost 8545">
                <div class="color-indicator color-indicator--filled color-indicator--border-color-ui-2 color-indicator--color-ui-2 color-indicator--size-lg">
                  <span class="color-indicator__inner-circle"></span>
                </div>
                Localhost 8545
              </MenuItem>
              <MenuItem value=" custom RPC">
                <div class="color-indicator color-indicator--filled color-indicator--border-color-ui-2 color-indicator--color-transparent color-indicator--size-lg">
                  <span class="color-indicator__inner-circle"></span>
                </div>
                Custom RPC
              </MenuItem>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
