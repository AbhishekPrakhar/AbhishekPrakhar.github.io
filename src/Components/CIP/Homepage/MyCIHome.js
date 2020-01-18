import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardWithinCardComponent from '../GenericComponents/CardComponent/CardWithinCardComponent';
import * as types from '../../../Actions/ActionTypes';
class MyCIHome extends Component {
    constructor() {
        super();
        this.state = {
            currentAffairs: ["PR / Media Releases", "Local Events / Campaigns", "Data Release", "Analyst Calls"],
            marketOverview: [
                { title: "Launch Estimates", link: '#', isLink: true, key: types.LAUNCHESTIMATE },
                { title: "Govt. Policies Update", link: '#', isLink: false, key: '' },
                { title: "Reimbursement News", link: '#', isLink: false, key: '' },
                { title: "Pricing Guidelines", link: '#', isLink: false, key: '' }
            ],
            peopleAndPost: ["Key People", "Recent Hires", "Team Size", "Open Position"],
            kitchen: ["Ongoing Clinical Trials (Bull’s Eye)", "Trial Summary (endpoints, design, etc.)", "Recruitment Status", "KOL Trial Map"],
            table: [
                { title: "Local & Global Congress Calendar", link: '#', isLink: true, key: types.CONGRESSCALENDAR },
                { title: "Congress Publications & Topics per X", link: '#', isLink: false, key: '' },
                { title: "Congress Sponsor Status of X", link: '#', isLink: false, key: '' },
                { title: "Post Congress Insights & Updates", link: '#', isLink: false, key: '' }
            ],
            afterTaste: ["Simulated Perceptions (local/Global PMR)", "In-Clinic Perceptions (local Field Insights)", "Congress & Booth Insights (surveys)", "NLP based Opinion & Reputation Mining"]
        }
    }
    render() {
        const { Opted } = this.props;
        return (
            <div className="myCIHomeWrapper container">
                <div className="decodeXWrapper"><span>DECODE X</span>
                    <div className="sideLogoWrapper">
                        <p><span>D</span><sub>X</sub></p>
                        <p style={{ lineHeight: '1' }}>Intelligent</p>
                        <p style={{ lineHeight: '1.5' }}>Insightful</p>
                        <p style={{ lineHeight: '2' }}>Immediate</p>
                    </div>
                </div>
                <div className="row researchWorklistWrapper">
                    {Opted.checkedA ?
                        <div className="col-xs-12 col-sm-4 cardContainer">
                            <CardWithinCardComponent cardArray={this.state.currentAffairs} title="Current Affairs" />
                        </div>
                        : null}
                    {Opted.checkedB ?
                        <div className="col-xs-12 col-sm-4 cardContainer">
                            <CardWithinCardComponent cardArray={this.state.marketOverview} title="Market Overview" />
                        </div>
                        : null}
                    {Opted.checkedC ?
                        <div className="col-xs-12 col-sm-4 cardContainer">
                            <CardWithinCardComponent cardArray={this.state.peopleAndPost} title="People & Posts" />
                        </div>
                        : null}

                </div>

                <div className="row researchWorklistWrapper">
                    {Opted.checkedD ?
                        <div className="col-xs-12 col-sm-4 cardContainer">
                            <CardWithinCardComponent cardArray={this.state.kitchen} title="What's In The Kitchen" />
                        </div>
                        : null}
                    {Opted.checkedE ?
                        <div className="col-xs-12 col-sm-4 cardContainer">
                            <CardWithinCardComponent cardArray={this.state.table} title="Congress Planner" />
                        </div>
                        : null}
                    {Opted.checkedF ?
                        <div className="col-xs-12 col-sm-4 cardContainer">
                            <CardWithinCardComponent cardArray={this.state.afterTaste} title="What's The Aftertaste" />
                        </div>
                        : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Opted: state.PreferenceOptedReducer
    }
}

export default connect(mapStateToProps, null)(MyCIHome);
