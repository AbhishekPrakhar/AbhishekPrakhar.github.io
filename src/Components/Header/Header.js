import React, { Component } from 'react'
import SearchBar from './searchAppbar';
import Ribbon from './ribbon';
import './Header.css';

import { connect } from 'react-redux'
import * as actionType from '../../Actions/ActionTypes';

class Header extends Component {
    render () {
        return (
            <div>
                <SearchBar client={this.props.client}/>
                {/* {(this.props.selectedView !== (actionType.SEARCH || actionType.PREFERENCE)) &&
                    <Ribbon />
                } */}
                {
                    (this.props.selectedView !== actionType.SEARCH 
                        && this.props.selectedView !== actionType.PREFERENCE
                        && this.props.selectedView !== actionType.ADVANCESEARCH
                        && this.props.selectedView !== actionType.LAUNCHESTIMATE
                        && this.props.selectedView !== actionType.CONGRESSCALENDAR
                        && this.props.selectedView !== actionType.EVENTDETAILSVIEW
                        && this.props.selectedView !== actionType.MANAGEUSERS
                        && this.props.selectedView !== actionType.MANAGESOURCES
                        && this.props.selectedView !== actionType.ALERTS
                        && this.props.selectedView !== actionType.DISEASEAREAPIPELINEVIEW
                        && this.props.selectedView !== actionType.BRANDVIEWCLINICALTRIAL
                        && this.props.selectedView !== actionType.MYSAVEDSEARCHESPAGE
                        && this.props.selectedView !== actionType.VIEWALLNOTIFICATION
                    ) ?
                    <Ribbon /> :null
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state) => (state.CIPReducer)

export default connect(mapStateToProps)(Header);