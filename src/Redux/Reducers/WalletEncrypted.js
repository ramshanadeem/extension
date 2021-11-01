import { CREATE_WALLET_ENCRYTED, IMPORT_WALLET } from "../ActionType";

const inititalState={
    walletEncrypt:null,
}
export default function(state=inititalState,action)
{
    const {type,payload}=action;

    switch (type) {
        case CREATE_WALLET_ENCRYTED:
            return{
                  ...state,
                  walletEncrypt:
                  {
                    ...state.walletEncrypt,
                    ...payload,
                  },
                };
    case IMPORT_WALLET:
        return{
            ...state,
            walletEncrypt:{
                ...state.walletEncrypt,
                ...payload,
            },
        }
         
        default:
      return state;
    }
}