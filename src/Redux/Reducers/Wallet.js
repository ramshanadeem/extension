import { CREATE_WALLET } from "../ActionType";

const initialState={
    wallet:null,
}

export default function (state=initialState,action) {
     const {type,payload} = action;
    switch (type) {
        case CREATE_WALLET:
            return{
                ...state,
                wallet:{
                    ...state.wallet,
                    ...payload
            }
        }
            
    
        default:
            return state;
    }
}