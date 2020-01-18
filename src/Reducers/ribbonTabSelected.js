import * as actionType from '../Actions/ActionTypes';


const nameInitialState = 0;
export default function ribbonSelectedTab(state = nameInitialState, action) {
    console.log(nameInitialState,action.value,"checking action")
    switch (action.type) {
        case actionType.RIBBONTABSELECTED:{
            return action.value
        }
        default:
            return state
                
    }
}