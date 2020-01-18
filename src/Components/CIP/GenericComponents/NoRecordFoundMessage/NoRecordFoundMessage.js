import NoRecord from '../../../../Assets/NoRecordFound/noRecord.png'
import './NoRecordFoundMessage.css';
import React, { Component } from 'react'

export default class NoRecordFoundMessage extends Component {
    render() {
        return (
            <div className="noRecordFounds">
                {console.log("Hi No reord Founds")}
            <img className="noRecordFoundsImg" src={NoRecord} alt='No Record Found'/>
            <h4 className="noRecordFoundsMessage"> No Records Found </h4>
            </div>
        )
    }
}
