import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Homepage.css';
import '../GenericComponents/CardComponent/CardComponent\.css';
import MyCIHome from './MyCIHome';
import MyCIHomeGeneric from './MyCIHomeGeneric';
import TAView from './TAView';
import CompetitorView from './CompetitorView';
import MyView from './MyView';
import Grid from '../GenericComponents/Grid/Grid';
import PipelineDashboard from './PipelineDashboard/PipeLineDashboard';
import UsageAnalyticsDashboard from './UsageAnalyticsDashboard/UsageAnalyticsDashboard';
import ClinicalTrialDashoard from './ClinicalTrialDashoard/ClinicalTrialDashboard';

class Homepage extends Component {
    render() {
        return (
            <div className="homepageWrapper">
                {
                    (this.props.tabSelected === 0 && this.props.client === "Novartis") &&
                    <MyCIHome />
                }
                {
                    (this.props.tabSelected === 0 && this.props.client !== "Novartis") &&
                    <MyCIHomeGeneric />
                }
                {
                    (this.props.tabSelected === 1) &&
                    <TAView />
                }
                {
                    (this.props.tabSelected === 2) &&
                    <CompetitorView />
                }
                {
                    (this.props.tabSelected === 3) &&
                    <PipelineDashboard />
                }
                {(this.props.tabSelected === 4) &&
                    <UsageAnalyticsDashboard />
                }
                {
                    (this.props.tabSelected === 5) &&
                    <ClinicalTrialDashoard />
                }
                {
                    (this.props.tabSelected === 6 ) &&
                    <Grid viewName={this.props.myViewName !=undefined ? this.props.myViewName.trim() :this.props.myViewName}/>
                }
                
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userName: state.CIPReducer.userName,
        tabSelected: state.CIPReducer.tabSelected,
        selectedView: state.CIPReducer.selectedView,
        tabSelected: state.CIPReducer.tabSelected,
        myViewName :state.CIPReducer.myViewName
    };
}
export default connect(mapStateToProps, null)(Homepage);
