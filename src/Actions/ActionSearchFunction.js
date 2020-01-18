import * as types from './ActionTypes';

export function setCurrentView(selectedView, obj) {
  let type = "";

  switch (selectedView) {
    case types.LOGIN:
      type = types.LOGIN;
      break;
    case types.HOME:
      type = types.HOME;
      break;
    case types.SEARCH:
      type = types.SEARCH;
      break;
    case types.ADVANCESEARCH:
      type = types.ADVANCESEARCH;
      break;
    case types.PREFERENCE:
      type = types.PREFERENCE;
      break;
    case types.LAUNCHESTIMATE:
      type = types.LAUNCHESTIMATE;
      break;
    case types.CONGRESSCALENDAR:
      type = types.CONGRESSCALENDAR;
      break;
    case types.EVENTDETAILSVIEW:
      type = types.EVENTDETAILSVIEW;
      break;
    case types.THERAPEUTICAREAVIEW:
      type = types.THERAPEUTICAREAVIEW;
      break;
    case types.COMPETITORVIEW:
      type = types.COMPETITORVIEW;
      break;
    case types.ALERTS:
      type = types.ALERTS;
      break;
    case types.MANAGEUSERS:
      type = types.MANAGEUSERS;
      break;
    case types.MANAGESOURCES:
      type = types.MANAGESOURCES;
      break;
    case types.DISEASEAREAPIPELINEVIEW:
      type = types.DISEASEAREAPIPELINEVIEW;
      break;
    case types.BRANDVIEWCLINICALTRIAL:
      type = types.BRANDVIEWCLINICALTRIAL;
      break;
    case types.MYSAVEDSEARCHESPAGE:
      type = types.MYSAVEDSEARCHESPAGE;
      break;
    case types.VIEWALLNOTIFICATION:
      type = types.VIEWALLNOTIFICATION;
      break;
  }
  return dispatch => {
    dispatch({
      type: type,
      selectedView: selectedView,
      obj: obj
    })
  }
}


//===========Search Actions =======================//


export function SearchContent(name, description, value, open) {
  return {
    type: types.searchContent,
    value: {
      name: name,
      description: description,
      value: value,
      open: open
    }

  }
}

export function SavesearchKeyword(value) {
  return {
    type: types.Keyword,
    value: value
  }
}


//===========Search Actions Ends =======================//

//===========Preferences selection reducer =============//

export function PreferenceOpted(value) {
  return {
    type: types.PREFERENCEOPTED,
    value: value
  }
}

//===========Preferences selection ENDS =============//

//===========Rebbion Selection reducer =============//


export function RibonTabSelected(value) {
  return dispatch => {
    dispatch({
      type: types.RIBBONTABSELECTED,
      value: value
    })
  }
}

//===========Rebbion Selection ENDS =============//
/* TA View TA dropdown selection start */
export function setCurrentTheuraputicArea(name) {
  return dispatch => {
    dispatch({
      type: types.THERAPEUTICAREACHANGED,
      TAName: name
    })
  }
}
/* TA View TA dropdown selection ends */

export function setSelectedEventData(type, selectedEvent) {
  return dispatch => {
    dispatch({
      type: type,
      selectedEvent: selectedEvent
    })
  }
}