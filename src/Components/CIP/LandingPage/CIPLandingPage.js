import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Login from '../Login/Login';
import TAView from '../Homepage/TAView';
import CompetitorView from '../Homepage/CompetitorView';
import Homepage from '../Homepage/Homepage';
import * as actionType from '../../../Actions/ActionTypes';
import SearchResults from '../../search/searchResult';
import '../../../Styles/GeneralStyles.css';
import '../../../Styles/Roboto.css';
import '../../../Styles/Roboto.css'; 
// import PREFERENCE from '../../preferences/preferences';
import Checkout from '../../preferences/checkout';
import LaunchEstimate from '../LaunchEstimates/LaunchEstimate';
import Calendar from '../CongressCalendar/CongressPlanner';
import EventDetails from '../CongressCalendar/EventDetails';
import AdvanceSearch from '../../search/advanceSearch';
import Alerts from '../../preferences/alert';
import Adminpage from '../../ManageUsers/adminPage';
import ManageSources from '../../ManageSources/manageSources';
import DiseaseAreaPipeLineView from '../DiseaseAreaPipelineView/DiseaseAreaPipeLineView';
import BrandViewClinicalTrial from '../BrandViewClinicalTrial/BrandViewClinicalTrial';
import MySavedSearchesPage from '../MySavedSearchPage/SavedSearch';
import ViewAllNotification from '../ViewAllNotification/ViewAllNotification';

const client="Generic Client";
let dashboard=< Homepage client={client} />;


class CIPLandingPage extends Component {
    
    componentWillReceiveProps(nextProps) {
        console.log("nextProps.selectedView",nextProps.selectedView)
        if (this.props.selectedView !== nextProps.selectedView) {
            switch (nextProps.selectedView) {
                case actionType.LOGIN:
                    dashboard = < Login />
                    break;
                case actionType.HOME:
                    dashboard = < Homepage client={client} />
                    break;
                case actionType.THERAPEUTICAREAVIEW:
                    dashboard = < TAView />
                    break;
                case actionType.COMPETITORVIEW:
                    dashboard = < CompetitorView />
                    break;
                case actionType.SEARCH:
                    dashboard = < SearchResults />
                    break;
                case actionType.ADVANCESEARCH:
                    dashboard = < AdvanceSearch />
                    break;
                case actionType.PREFERENCE:
                    dashboard = < Checkout />
                    break;
                case actionType.ALERTS:
                    dashboard = < Alerts />
                    break;
                case actionType.MANAGEUSERS:
                    dashboard = < Adminpage />
                    break;
                case actionType.MANAGESOURCES:
                    dashboard = < ManageSources />
                    break;
                case actionType.LAUNCHESTIMATE:
                    dashboard = < LaunchEstimate />
                    break;
                case actionType.CONGRESSCALENDAR:
                    dashboard = < Calendar />
                    break;
                case actionType.EVENTDETAILSVIEW:
                    dashboard = < EventDetails />
                    break;
                case actionType.DISEASEAREAPIPELINEVIEW:
                    dashboard = < DiseaseAreaPipeLineView />
                    break;
                case actionType.BRANDVIEWCLINICALTRIAL:
                    dashboard = < BrandViewClinicalTrial />
                    break;
                case actionType.MYSAVEDSEARCHESPAGE:
                    dashboard = < MySavedSearchesPage />
                    break;
               case actionType.VIEWALLNOTIFICATION:
                    dashboard = < ViewAllNotification />
                    break;
                default:
                    dashboard = <Login />
            }
        }
    }
    render() {
        
        return (
            <div>
                {(this.props.selectedView !== actionType.LOGIN) &&
                    <Header client={client}/>
                }
                <div className="dashboardWrapper">
                    {dashboard}
                </div>
                {(this.props.selectedView !== actionType.LOGIN) &&
                    <Footer />
                }

            </div>
        )
    }
}
function mapStateToProps(state) {
    console.log("state.CIPReducer.selectedView",state.CIPReducer.selectedView)
    return {
        selectedView: state.CIPReducer.selectedView
    };
}
export default connect(mapStateToProps, null)(CIPLandingPage);

