import React from "react";
import events from "./events";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import { connect } from 'react-redux';
import './react-big-calendar.css';
import './congressCalender.css';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import { setCurrentView, setSelectedEventData } from '../../../Actions/ActionSearchFunction';
import * as types from '../../../Actions/ActionTypes';
import { store } from "../../../Store/Store";
import PropTypes from 'prop-types';
import BreadCrumbs from '../GenericComponents/BreadCrumbs/breadCrumbs';

BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const styles = theme => ({
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

class Dnd extends React.Component {

    eventDoubleClick = (event, syntheticEvent) => {
        // this.setState({
        //     selectedEvent: event
        // });
        store.dispatch(setSelectedEventData(types.EVENTDETAILSVIEW, event));
    };

    handleClick = (event) => {
        event.preventDefault();
        store.dispatch(setCurrentView(types.HOME, { "userName": null, "tabSelected": 0 }));
    }

    render() {        
        const classes = this.props.classes;
        return (
            <div>
                <div>
                <BreadCrumbs ComponentName='Congress Planner' TabName='Disease Area' TabValue = '1' PageName = 'View Calendar'/>
                </div>
                <div>
                    <DragAndDropCalendar
                        selectable
                        views={['month', 'day']}
                        events={events}
                        resizable
                        onDoubleClickEvent={this.eventDoubleClick}
                        draggableAccessor={event => false}
                        defaultView={BigCalendar.Views.MONTH}
                        defaultDate={new Date()}
                    />
                </div>
            </div>
        );
    }
}

const Calendar = DragDropContext(HTML5Backend)(Dnd);

function mapStateToProps(state) {
    return {
        selectedEvent: state.selectedEvent,
        classes: PropTypes.object.isRequired
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Calendar));
