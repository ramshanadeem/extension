
import { combineReducers } from "redux";
import Wallet from "./Wallet";
import WalletEncrypted from "./WalletEncrypted";

export default combineReducers({
    Wallet,
    WalletEncrypted
})