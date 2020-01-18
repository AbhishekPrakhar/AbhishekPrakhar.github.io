import * as types from '../Actions/ActionTypes';

const initialState={
    searchKeyword : '',
    values:[],
    data:null
    }

 export default function SavedSearchesModalReducer(state=initialState,action){       
    switch(action.type){
        case types.Keyword:
        return Object.assign({},state,{
            searchKeyword: action.value
        });
        case types.searchContent:
        return  {...state ,values:action.value}
        
        // case types.POST_SERVICE:
        // return Object.assign({},state,{
        //     data : action.data
        // })
        default:
         return state;
    }
 }