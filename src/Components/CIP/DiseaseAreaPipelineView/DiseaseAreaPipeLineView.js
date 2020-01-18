import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import './DiseaseAreaPipeLineView.css';
import BreadCrumbs from '../GenericComponents/BreadCrumbs/breadCrumbs';
import CardWithChartComponent from '../GenericComponents/CardComponent/CardWithChartComponent';
import TableWithFeatures from '../GenericComponents/TableWithFeatures/TableWithFeatures';
import BasicMap from '../GenericComponents/Maps/Map';
import PropTypes from 'prop-types';
class DiseaseAreaPipeLineView extends Component {
    render() {
        const developmentStatus = [{ name: "Approved", y: 4 },
        { name: "Inactive", y: 50 },
        { name: "Pipeline", y: 45 }];
        const developmentPhase = [{ y: 44, label: "Launched" },
        { y: 4, label: "Registered" },
        { y: 2, label: "Pre Registration" },
        { y: 39, label: "Phase III" },
        { y: 165, label: "Phase II" },
        { y: 146, label: "Phase I" },
        { y: 140, label: "Preclinical" },
        { y: 3, label: "Suspended" },
        { y: 150, label: "Discontinued" },
        { y: 395, label: "No Development Reported" }];
        const topTenCompanies = [{ y: 44, label: "Pfizer" },
        { y: 26, label: "Merck" },
        { y: 23, label: "GSK" },
        { y: 21, label: "Bayer" },
        { y: 19, label: "Amgen" },
        { y: 15, label: "Novartis" },
        { y: 12, label: "Eli Lilly" }];
        return (
            <div>
            <div>
            <BreadCrumbs ComponentName='PipeLine' TabName='Disease Area' TabValue = '1' PageName = 'View DashBoard'/>
            </div>
            <div className="TAViewWrapper PipeLineDashboardWrapper">
                <div className="pipelineDiseaseWrapper">
                    <h1 className="clinicalTrialHeading ">Pipeline</h1>
                    <div className="row margin0">
                        <div className="col-sm-4 col-xs-12 paddingRight0">
                            <div className="paperWrapper">
                            <Paper >
                                <p className="margin0"> TOTAL DRUGS</p>
                                <p className="margin0">1088</p>
                            </Paper>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xs-12 padding0">
                        <div className="paperWrapper ">
                            <Paper >
                                <div className="row margin0">
                                    <div className="col-sm-4 col-xs-12">
                                        <div >
                                            <p className="margin0"> APPROVED</p>
                                            <p className="margin0">48</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-xs-12">
                                        <div >
                                            <p className="margin0"> PIPELINE</p>
                                            <p className="margin0">492</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-xs-12">
                                        <div >
                                            <p className="margin0"> INACTIVE</p>
                                            <p className="margin0">548</p>
                                        </div>
                                    </div>
                                </div>
                            </Paper >
                        </div>
                        </div>
                        <div className="col-sm-2 col-xs-12 paddingLeft0">
                        <div className="paperWrapper ">
                            <Paper >
                                <p className="margin0"> CONVERSION RATE</p>
                                <p className="margin0">8%</p>
                            </Paper>
                        </div>
                        </div>
                    </div>
                    <div className="row margin0">
                        <div className="col-sm-4 col-xs-12 cardContainer chartCardContainer paddingRight0">
                            <CardWithChartComponent chartArray={developmentStatus} title="Development Status" type="Development Status" />
                        </div>
                        <div className="col-sm-8 col-xs-12 cardContainer chartCardContainer paddingLeft0">
                            <CardWithChartComponent chartArray={developmentPhase} title="Development Phase" type="Phase" />
                        </div>
                    </div>
                    <div className="row margin0">
                        <div className="col-sm-4 col-xs-12 cardContainer chartCardContainer paddingRight0">
                            <CardWithChartComponent chartArray={topTenCompanies} title="Top 10 Companies" type="Companies" />
                        </div>
                        <div className="col-sm-8 col-xs-12 cardContainer chartCardContainer paddingLeft0">
                            <TableWithFeatures />
                        </div>
                    </div>
                </div>
                {/* <h1 className="clinicalTrialHeading">Clinical Trials</h1>
                <div className="row margin0">
                    <div className="col-sm-4 col-xs-12 paperWrapper">
                        <Paper >
                            <p className="margin0"> TOTAL NUMBER OF TRIALS</p>
                            <p className="margin0">101</p>
                        </Paper>
                    </div>
                    <div className="col-sm-8 col-xs-12 paperWrapper">
                        <Paper >

                            <div className="row margin0">
                                <div className="col-sm-3 col-xs-12">
                                    <div >
                                        <p className="margin0"> COMPLETED</p>
                                        <p className="margin0">67</p>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-xs-12">
                                    <div >
                                        <p className="margin0"> ONGOING</p>
                                        <p className="margin0">12</p>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-xs-12">
                                    <div >
                                        <p className="margin0"> PLANNED</p>
                                        <p className="margin0"></p>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-xs-12">
                                    <div >
                                        <p className="margin0"> TERMINATED</p>
                                        <p className="margin0">22</p>
                                    </div>
                                </div>
                            </div>
                        </Paper >
                    </div>
                </div>
                <div className="row margin0">
                    <div className="col-sm-4 col-xs-12 cardContainer chartCardContainer paddingRight0">
                        <div className="clinicalDoughnutWrapper">
                            <CardWithChartComponent title="Development Phase" type="Clinical Trial Development Phase" />
                        </div>
                    </div>
                    <div className="col-sm-8 col-xs-12 cardContainer chartCardContainer">
                        <div className="StackedColumnChartWrapper">
                            <CardWithChartComponent title="Trial Start Date" type="Clinical Trial Start Date" />
                        </div>
                        <div className="RangeChartWrapper">
                            <CardWithChartComponent title="Trial Timeline" type="Clinical Trial Timeline" />
                        </div>
                    </div>
                </div>
                <h1 className="clinicalTrialHeading">Clinical Trials Location</h1>
                <div className="paperWrapper locationWrapper">
                    <Paper >
                        <BasicMap />
                    </Paper>
                </div> */}
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedEvent: state.selectedEvent,
        classes: PropTypes.object.isRequired
    }
}

export default connect(mapStateToProps)(DiseaseAreaPipeLineView);
