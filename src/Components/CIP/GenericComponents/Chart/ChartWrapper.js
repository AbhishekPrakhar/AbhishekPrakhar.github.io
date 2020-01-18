import React, { Component } from 'react';
import { connect } from 'react-redux';
import CrossHair from '../Chart/CrossHair';
import Paper from '@material-ui/core/Paper';
class ChartWrapper extends Component {
    render() {
        return (
            <div className="chartWrapper" id={this.props.identifier}>
                <div className="row">
                    <div className="col-xs-6 col-sm-3 tilesWrapper">
                        <Paper >
                            <p className="margin0"> Total</p>
                            <p className="margin0">435529</p>
                        </Paper>
                    </div>
                    <div className="col-xs-6 col-sm-3 tilesWrapper">
                        <Paper >
                            <p className="margin0"> Average</p>
                            <p className="margin0">31109</p>
                        </Paper>
                    </div>
                    <div className="col-xs-6 col-sm-3 tilesWrapper">
                        <Paper >
                            <p className="margin0"> Mimimum</p>
                            <p className="margin0">0</p>
                        </Paper>
                    </div>
                    <div className="col-xs-6 col-sm-3 tilesWrapper">
                        <Paper >
                            <p className="margin0"> Maximum</p>
                            <p className="margin0">84016</p>
                        </Paper>
                    </div>
                </div>

                {/* <TabComponent tabArray={this.props.tabArray} /> */}
                <CrossHair chartArray={this.props.chartArray}/>
                <div className="hideChart1" >
                </div>
                <div className="hideChart2" >
                </div>
            </div>
        )
    }
}

export default connect(null, null)(ChartWrapper);
