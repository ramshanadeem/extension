import React from "react";

function DropDown() {
  return (
    <div>
      <div
        className="menu-droppo-container network-droppo"
        style={{
          position: "absolute",
          top: "58px",
          width: "309px",
          zIndex: "55",
        }}
      >
        <div
          className="menu-droppo"
          style={{
            borderRadius: "4px",
            padding: "18px 8px",
            background: "rgba(0, 0, 0, 0.8)",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 2px 2px",
          }}
        >
          <div className="network-dropdown-header">
            <div className="network-dropdown-title">Networks</div>
            <div className="network-dropdown-divider"></div>
            <div className="network-dropdown-content">
              The default network for Ether transactions is Mainnet.
            </div>
          </div>
          <li
            className="dropdown-menu-item"
            tabindex="0"
            style={{
              listStyle: "none",
              padding: "12px 0px",
              fontSize: "16px",
              fontStyle: "normal",
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-star",
              alignItems: "center",
              color: "white",
              lineHeight: "20px",
            }}
          >
            <div className="network-check__transparent">✓</div>
            <div className="color-indicator color-indicator--filled color-indicator--border-color-mainnet color-indicator--color-mainnet color-indicator--size-lg">
              <span className="color-indicator__inner-circle"></span>
            </div>
            <span
              className="network-name-item"
              style={{ color: "rgb(155, 155, 155)" }}
            >
              Ethereum Mainnet
            </span>
          </li>
          <li
            className="dropdown-menu-item"
            tabindex="0"
            style={{
              listStyle: "none",
              padding: "12px 0px",
              fontSize: "16px",

              fontStyle: "normal",
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "white",
              lineHeight: "20px",
            }}
          >
            <div className="network-check__transparent">✓</div>
            <div className="color-indicator color-indicator--filled color-indicator--border-color-ropsten color-indicator--color-ropsten color-indicator--size-lg">
              <span className="color-indicator__inner-circle"></span>
            </div>
            <span
              className="network-name-item"
              style={{ color: "rgb(155, 155, 155)" }}
            >
              Ropsten Test Network
            </span>
          </li>
          <li
            className="dropdown-menu-item"
            tabindex="0"
            style={{
              listStyle: "none",
              padding: "12px 0px",
              fontSize: "16px",
              fontStyle: "normal",
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "white",
              lineHeight: "20px",
            }}
          >
            <div className="network-check__transparent">✓</div>
            <div className="color-indicator color-indicator--filled color-indicator--border-color-kovan color-indicator--color-kovan color-indicator--size-lg">
              <span className="color-indicator__inner-circle"></span>
            </div>
            <span
              className="network-name-item"
              style={{ color: "rgb(155, 155, 155)" }}
            >
              Kovan Test Network
            </span>
          </li>
          <li
            className="dropdown-menu-item"
            tabindex="0"
            style={{
              listStyle: "none",
              padding: "12px 0px",
              fontSize: "16px",
              fontStyle: "normal",
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "white",
              lineHeight: "20px",
            }}
          >
            <i className="fa fa-check"></i>
            <div className="color-indicator color-indicator--filled color-indicator--border-color-white color-indicator--color-rinkeby color-indicator--size-lg">
              <span className="color-indicator__inner-circle"></span>
            </div>
            <span
              className="network-name-item"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              Rinkeby Test Network
            </span>
          </li>
          <li
            className="dropdown-menu-item"
            tabindex="0"
            style={{
              listStyle: "none",
              padding: "12px 0px",

              fontSize: "16px",
              fontStyle: "normal",
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "white",
              lineHeight: "20px",
            }}
          >
            <div className="network-check__transparent">✓</div>
            <div className="color-indicator color-indicator--filled color-indicator--border-color-goerli color-indicator--color-goerli color-indicator--size-lg">
              <span clclassNameass="color-indicator__inner-circle"></span>
            </div>
            <span
              className="network-name-item"
              style={{ color: "rgb(155, 155, 155)" }}
            >
              Goerli Test Network
            </span>
          </li>
          <li
            className="dropdown-menu-item"
            tabindex="0"
            style={{
              listStyle: "none",
              padding: "12px 0px",
              fontSize: "16px",
              fontStyle: "normal",
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "white",
              lineHeight: "20px",
            }}
          >
            <div className="network-check__transparent">✓</div>
            <div className="color-indicator color-indicator--filled color-indicator--border-color-ui-2 color-indicator--color-ui-2 color-indicator--size-lg">
              <span className="color-indicator__inner-circle"></span>
            </div>
            <span
              className="network-name-item"
              style={{ color: "rgb(155, 155, 155)" }}
            >
              Localhost 8545
            </span>
            <i class="fa fa-times delete"></i>
          </li>
          <li
            className="dropdown-menu-item"
            tabindex="0"
            style={{
              listStyle: "none",
              padding: "12px 0px",
              fontSize: "16px",
              fontStyle: "normal",
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "white",
              lineHeight: "20px",
            }}
          >
            <div className="network-check__transparent">✓</div>
            <div className="color-indicator color-indicator--filled color-indicator--border-color-ui-2 color-indicator--color-transparent color-indicator--size-lg">
              <span className="color-indicator__inner-circle"></span>
            </div>
            <span
              className="network-name-item"
              style={{ color: "rgb(155, 155, 155)" }}
            >
              Custom RPC
            </span>
          </li>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
