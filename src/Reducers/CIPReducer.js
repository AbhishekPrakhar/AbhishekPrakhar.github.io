
import * as actionType from '../Actions/ActionTypes';

const initialState = {
    "selectedView": actionType.HOME,
    "tabSelected": 0,
    "open": false,
    "TAChanged": "Select",
    "selectedEvent": {},
    "obj": {},
    "myViewName": ""
};

export default function CIPReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.LOGIN:
            return {
                selectedView: action.selectedView
            }
        case actionType.HOME:
            return {
                selectedView: action.selectedView,
                userName: action.obj.userName,
                tabSelected: action.obj.tabSelected,
                obj: action.obj,
                myViewName: action.obj.myViewName
            }
        case actionType.SEARCH:
            return {
                selectedView: action.selectedView
            }
        case actionType.ALERTS:
            return {
                selectedView: action.selectedView
            }
        case actionType.MANAGEUSERS:
            return {
                selectedView: action.selectedView
            }
        case actionType.MANAGESOURCES:
            return {
                selectedView: action.selectedView
            }
        case actionType.ADVANCESEARCH:
            return {
                selectedView: action.selectedView
            }
        case actionType.LAUNCHESTIMATE:
            return {
                selectedView: action.selectedView
            }
        case actionType.CONGRESSCALENDAR:
            return {
                selectedView: action.selectedView
            }
        case actionType.EVENTDETAILSVIEW:
            return {
                selectedView: action.type,
                selectedEvent: action.selectedEvent
            }
        case actionType.PREFERENCE:
            return {
                selectedView: action.selectedView,
                userName: action.obj.userName,
                tabSelected: action.obj.tabSelected
            }
        case actionType.THERAPEUTICAREAVIEW:
            return {
                selectedView: action.selectedView,
                TAChanged: action.obj.TAChanged,
                tabSelected: 1
            }
        case actionType.COMPETITORVIEW:
            return {
                selectedView: action.selectedView,
                TAChanged: action.obj.TAChanged,
                tabSelected: 2
            }
        case actionType.THERAPEUTICAREACHANGED:
            return {
                TAName: action.TAName
            }
        case actionType.DISEASEAREAPIPELINEVIEW:
            return {
                selectedView: action.selectedView
            }
        case actionType.BRANDVIEWCLINICALTRIAL:
            return {
                selectedView: action.selectedView
            }
        case actionType.MYSAVEDSEARCHESPAGE:
            return {
                selectedView: action.selectedView
            }
        case actionType.VIEWALLNOTIFICATION:
            return {
                selectedView: action.selectedView
            }
        default:
            return state;
    }
}

