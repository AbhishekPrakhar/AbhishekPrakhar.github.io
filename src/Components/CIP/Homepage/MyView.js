import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '../GenericComponents/Grid/Grid'
// import CardWithinCardComponent from '../GenericComponents/CardComponent/CardWithinCardComponent';
// import * as types from '../../../Actions/ActionTypes';
import './MyView.css';

class MyView extends Component {
    render() {
        return (
            <div className="MyViewWrapper">
               <Grid viewName={this.props.myViewName}/>
            </div>
        )
    }
}

export default connect(null, null)(MyView);
