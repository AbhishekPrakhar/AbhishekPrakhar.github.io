import * as actionType from '../Actions/ActionTypes';

const nameInitialState = {
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
    checkedE: true,
    checkedF: true,
}
export default function preferenceOptedReducer(state = nameInitialState, action) {
    console.log(nameInitialState,action.value,"checking action")
    switch (action.type) {
        case actionType.PREFERENCEOPTED:{
            
            // const Array = action.value;
            // const ArrayKey = Object.keys(action.value)[0];
            // let namefinalState = {...nameInitialState}

            // namefinalState[ArrayKey]=Array[ArrayKey]

            // console.log(Array,"checking action")
            // console.log(nameInitialState.indexOf(Object.keys(action.value)))
            return action.value
        }
        default:
            return state
                
    }
}