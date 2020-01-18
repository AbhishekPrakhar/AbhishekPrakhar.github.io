import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import Link from '@material-ui/core/Link';
import * as types from '../../../Actions/ActionTypes';
import { store } from "../../../Store/Store";
import { setCurrentView } from '../../../Actions/ActionSearchFunction';
import './eventStyles.css';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    root: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    link: {
        display: 'flex'
    },
    icon: {
        marginRight: theme.spacing.unit / 2,
        width: 20,
        height: 20
    },
});

class EventDetails extends React.Component {

    handleHomeClick = (event) => {
        event.preventDefault();
        store.dispatch(setCurrentView(types.HOME, { "userName": null, "tabSelected": 0 }));
      }

    handleChange(event, newValue) {
        this.setState({ tabValue: newValue });
    }

    handleCalendarClick(event) {
        event.preventDefault();
        store.dispatch(setCurrentView(types.CONGRESSCALENDAR));
    }

    render() {
        if (this.state === null || this.state.tabValue === undefined) {
            this.state = {
                tabValue: "1"
            };
        }
        const classes = this.props.classes;
        const selectedEvent = this.props.selectedEvent;
        let tabContent = "";
        switch (this.state.tabValue) {
            case "1":
                tabContent = selectedEvent.tab1Content;
                break;
            case "2":
                tabContent = selectedEvent.tab2Content;
                break;
            case "3":
                tabContent = selectedEvent.tab3Content;
                break;
            case "4":
                tabContent = selectedEvent.tab4Content;
                break;
            case "5":
                tabContent = selectedEvent.tab5Content;
                break;
            default:
                tabContent = "Error";
                break;
        }
        return (
            <div>
                <Paper className={classes.root}>
                    <Breadcrumbs arial-label="Breadcrumb">
                        <Link color="inherit" href="/" onClick={this.handleHomeClick} className={classes.link}>
                            <HomeIcon className={classes.icon} />
                            Home
                        </Link>
                        <Typography color="textPrimary" className={classes.link}>
                            <Link color="inherit" href="/" onClick={this.handleCalendarClick} className={classes.link}>
                                Congress Planner
                            </Link>
                        </Typography>
                        <Typography color="textPrimary" className={classes.link}>
                            {selectedEvent.title}
                        </Typography>
                    </Breadcrumbs>
                </Paper>
                <Paper square>
                    <Tabs value={this.state.tabValue} indicatorColor="primary" textColor="primary" onChange={(event, newValue) => this.handleChange(event, newValue)}>
                        <Tab value="1" label="About" />
                        <Tab value="2" label="Who should attend" />
                        <Tab value="3" label="Why to attend?" />
                        <Tab value="4" label="Major Sessions" />
                        <Tab value="5" label="Market Research" />
                    </Tabs>
                </Paper>
                <div>
                    {
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    <div className="tabContent" dangerouslySetInnerHTML={{ __html: tabContent }}></div>
                                </Typography>
                            </CardContent>
                        </Card>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedEvent: state.CIPReducer.selectedEvent,
        classes: PropTypes.object.isRequired
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EventDetails));
