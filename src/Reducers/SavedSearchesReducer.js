import * as actionType from '../Actions/ActionTypes';


const initialState = {
    TokenValue: {},
    dummyJSON: [],
    error: undefined,
    isLoading: false,
    data:{}
}
export default function savedSearchReducer(state = initialState, action) {
    //console.log("action value",action);

    switch (action.type) {
        // case actionType.SERVICE_PENDING:
        //     return Object.assign({}, state, {
        //         isLoading: true,
        //         TokenValue: action.value,
        //     });
        // case actionType.SERVICE_ERROR:
        //     return Object.assign({}, state, {
        //         isLoading: false,
        //         error: action.error,
        //         TokenValue: action.value,
        //     });
        // case actionType.SERVICE_SUCCESS:
        //     return Object.assign({}, state, {
        //         isLoading: false,
        //         dummyJSON: action.data,
        //         TokenValue: action.value,
        //     });
        // case actionType.POST_SERVICE:
        //     return Object.assign({}, state, {
        //         data: action.data
        //     });
        // case actionType.sendData:
        //     // console.log("Send data is called",action)
        //     return Object.assign({}, state, {
        //         dummyJSON: action.data,
        //         TokenValue: action.value
        //     });

        //     case actionType.ServiceResponseFromCohort:
        //     return Object.assign({}, state, {
        //         responsefromcohort: action.value        
        //     });
        default:
            return state;
    }

}





