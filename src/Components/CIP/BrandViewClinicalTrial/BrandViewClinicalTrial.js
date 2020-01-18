import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import './BrandViewClinicalTrial.css';
import BreadCrumbs from '../GenericComponents/BreadCrumbs/breadCrumbs';
import CardWithChartComponent from '../GenericComponents/CardComponent/CardWithChartComponent';
import TableWithFeatures from '../GenericComponents/TableWithFeatures/TableWithFeatures';
import BasicMap from '../GenericComponents/Maps/Map';
import SimpleSelect from '../GenericComponents/Select/SimpleSelect';
class BrandViewClinicalTrial extends Component {
    render() {
        const sponserArr = ["sponser 1", "sponser 2", "sponser 3", "sponser 4"];
        const developmentPhaseArray = [{ name: "Phase I", y: 8 },
        { name: "Phase II", y: 71 },
        { name: "Phase III", y: 11 },
        { name: "Phase IV", y: 11 }];
        const clinicalTrialStatDate = [{
            "field": "General",
            "timeline": [
                { label: "2001", y: 14 },
                { label: "2002", y: 12 },
                { label: "2003", y: 14 },
                { label: "2004", y: 13 },
                { label: "2005", y: 13 },
                { label: "2006", y: 13 },
                { label: "2007", y: 14 },
                { label: "2008", y: 14 },
                { label: "2009", y: 13 },
                { label: "2010", y: 14 },
                { label: "2011", y: 14 },
                { label: "2012", y: 14 }
            ]
        },
        {
            "field": "Marketing",
            "timeline": [
                { label: "2001", y: 13 },
                { label: "2002", y: 13 },
                { label: "2003", y: 15 },
                { label: "2004", y: 16 },
                { label: "2005", y: 17 },
                { label: "2006", y: 17 },
                { label: "2007", y: 18 },
                { label: "2008", y: 18 },
                { label: "2009", y: 17 },
                { label: "2010", y: 18 },
                { label: "2011", y: 18 },
                { label: "2012", y: 18 }
            ]
        },
        {
            "field": "Sales",
            "timeline": [
                { label: "2001", y: 13 },
                { label: "2002", y: 13 },
                { label: "2003", y: 15 },
                { label: "2004", y: 15 },
                { label: "2005", y: 15 },
                { label: "2006", y: 15 },
                { label: "2007", y: 16 },
                { label: "2008", y: 17 },
                { label: "2009", y: 17 },
                { label: "2010", y: 18 },
                { label: "2011", y: 19 },
                { label: "2012", y: 20 },
            ]
        },
        {
            "field": "IT",
            "timeline": [
                { label: "2001", y: 14 },
                { label: "2002", y: 8 },
                { label: "2003", y: 6 },
                { label: "2004", y: 6 },
                { label: "2005", y: 5 },
                { label: "2006", y: 5 },
                { label: "2007", y: 6 },
                { label: "2008", y: 3 },
                { label: "2009", y: 9 },
                { label: "2010", y: 5 },
                { label: "2011", y: 8 },
                { label: "2012", y: 2 },
            ]
        }];
        const clinicalTrialTimeline=[{ label: "", y: [1450, 3550] },
        { label: "", y: [550, 3370] },
        { label: "", y: [800, 2750] },
        { label: "", y: [500, 3250] }];
        return (
            <div>
            <div>
            <BreadCrumbs ComponentName='Clinical Trial' TabName='Brand View' TabValue = '2' PageName = 'View DashBoard'/>
            </div>
            <div className="TAViewWrapper ClinicalTrialDashboardWrapper">
                <div className="row margin0">
                    <div className="col-sm-6 col-xs-12 padding0">
                        <h1 className="clinicalTrialHeading pull-left ">Clinical Trials</h1>
                    </div>
                    {/* <div className="col-sm-3 col-xs-12 paperWrapper">
                        <span>Sponser</span> <SimpleSelect arrPassed={sponserArr} />
                    </div>
                    <div className="col-sm-3 col-xs-12 paperWrapper">
                        <span>Disease</span> <SimpleSelect arrPassed={sponserArr} />
                    </div> */}
                </div>

                <div className="row margin0">
                    <div className="col-sm-4 col-xs-12 paperWrapper">
                        <Paper >
                            <p className="margin0"> TOTAL NUMBER OF TRIALS</p>
                            <p className="margin0">101</p>
                        </Paper>
                    </div>
                    <div className="col-sm-8 col-xs-12 paperWrapper paddingLeft5">
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
                            <CardWithChartComponent chartArray={developmentPhaseArray} title="Development Phase" type="Clinical Trial Development Phase" />
                        </div>
                    </div>
                    <div className="col-sm-8 col-xs-12 cardContainer chartCardContainer padding0">
                        <div className="StackedColumnChartWrapper">
                            <CardWithChartComponent chartArray={clinicalTrialStatDate} title="Trials by Year" type="Clinical Trial Start Date" />
                        </div>
                        <div className="RangeBarChartWrapper">
                            <CardWithChartComponent chartArray={clinicalTrialTimeline} title="Trial Timeline" type="Clinical Trial Timeline" />
                        </div>
                    </div>
                </div>
                {/* <h1 className="clinicalTrialHeading">Clinical Trials Location</h1> */}
                <div className="locationWrapper">
                    <Paper >
                        <BasicMap />
                    </Paper>
                </div>
            </div>
            </div>
        )
    }
}

export default connect(null, null)(BrandViewClinicalTrial);
