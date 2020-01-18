import { combineReducers } from 'redux';
import CIPReducer from './CIPReducer';
import SavedSearchesModalReducer from './SavedSearchesModalReducer';
import SavedSearchReducer from './SavedSearchesReducer';
import PreferenceOptedReducer from './preferenceOptedReducer';
import ribbonSelectedTab from './ribbonTabSelected';

const rootReducer = combineReducers({
  CIPReducer,
  SavedSearchesModalReducer,
  SavedSearchReducer,
  PreferenceOptedReducer,
  ribbonSelectedTab
});

export default rootReducer;