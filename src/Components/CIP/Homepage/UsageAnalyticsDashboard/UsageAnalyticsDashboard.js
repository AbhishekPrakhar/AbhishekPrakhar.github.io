import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import './UsageAnalyticsDashboard.css';
import CardWithChartComponent from '../../GenericComponents/CardComponent/CardWithChartComponent';
import TableWithFeatures from '../../GenericComponents/TableWithFeatures/TableWithFeatures';
import BasicMap from '../../GenericComponents/Maps/Map';
class UsageAnalyticsDashboard extends Component {
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
            <div className="TAViewWrapper UsageAnalyticsDashboardWrapper">
                <div className="pipelineDiseaseWrapper">
                    <h1 className="clinicalTrialHeading">Pipeline</h1>
                    <div className="row margin0">
                        <div className="col-sm-4 col-xs-12 ">
                        <div className="paperWrapper">
                            <Paper >
                                <p className="margin0"> SESSIONS</p>
                                <p className="margin0">1088</p>
                            </Paper>
                        </div>
                        </div>
                        <div className="col-sm-8 col-xs-12 paperWrapper">
                            <Paper >
                                <div className="row margin0">
                                    <div className="col-sm-4 col-xs-12">
                                        <div >
                                            <p className="margin0"> DISTINCT USERS</p>
                                            <p className="margin0">48</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-xs-12">
                                        <div >
                                            <p className="margin0"> SEARCHES</p>
                                            <p className="margin0">492</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-xs-12">
                                        <div >
                                            <p className="margin0"> ALERTS CREATED</p>
                                            <p className="margin0">54</p>
                                        </div>
                                    </div>
                                </div>
                            </Paper >
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
                <h1 className="clinicalTrialHeading">Clinical Trials</h1>
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
                            <CardWithChartComponent chartArray={clinicalTrialTimeline}  title="Trial Timeline" type="Clinical Trial Timeline" />
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
        )
    }
}

export default connect(null, null)(UsageAnalyticsDashboard);
