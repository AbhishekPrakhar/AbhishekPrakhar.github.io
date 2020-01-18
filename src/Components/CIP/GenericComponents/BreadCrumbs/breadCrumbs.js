import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Storage from '@material-ui/icons/Storage';
import LaunchIcon from '@material-ui/icons/Launch';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import HealingIcon from '@material-ui/icons/Healing';
import TimelineIcon from '@material-ui/icons/Timeline';
import Search from '@material-ui/icons/Search';
import './breadcrumbs.css';

import { connect } from 'react-redux';
import { setCurrentView } from '../../../../Actions/ActionSearchFunction';
import { RibonTabSelected } from '../../../../Actions/ActionSearchFunction';
import { store } from "../../../../Store/Store";
import * as types from '../../../../Actions/ActionTypes';

const styles = theme => ({
  root: {
    boxShadow: 'none',
    //background:'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  homelink: {
    display: 'flex',
    fontSize: '15px',
    padding: 2,
    color: 'gray'
  },
  link: {
    display: 'flex',
    fontSize: '15px',
    padding: 2,
    color: 'black'
  },
  icon: {
    marginRight: theme.spacing.unit / 2,
    width: 20,
    height: 20,
    padding: 2
  },

});

function handleClick(event, props) {
  event.preventDefault();
  store.dispatch(setCurrentView(types.HOME, { "userName": null, "tabSelected": parseInt(props) }));
  store.dispatch(RibonTabSelected(parseInt(props)));
}
function handleClickComponent(event, props) {
  event.preventDefault();
  store.dispatch(setCurrentView(types.HOME, { "userName": null, "tabSelected": parseInt(props) }));
  store.dispatch(RibonTabSelected(parseInt(props)));
}

function IconBreadcrumbs(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Breadcrumbs arial-label="Breadcrumb" className='Breadcrumbs'>
        <Link color="inherit" href="/" onClick={(e) => handleClick(e, props.TabValue)} className={classes.homelink}>
          {props.TabName === 'Home' ? <HomeIcon className={classes.icon} />
            : props.TabName === 'Disease Area' ? <HealingIcon className={classes.icon} />
              : <ViewCompactIcon className={classes.icon} />

          }
          {props.TabName}
        </Link>
        {/* <Link color="inherit" href="/lab/about/" onClick={handleClick} className={classes.link}>
          <WhatshotIcon className={classes.icon} />
          Lab
        </Link> */}
        {props.ComponentName != null ?
          <Link color="textPrimary" onClick={(e) => handleClickComponent(e, props.TabValue)} className={classes.link}>
            {props.ComponentName === "Congress Planner" ? <AvTimerIcon className={classes.icon} /> :
              props.ComponentName === "PipeLine" ? <TimelineIcon className={classes.icon} /> :
                props.ComponentName === "Launch Estimates" ? <LaunchIcon className={classes.icon} /> :
                  props.ComponentName === "Clinical Trial" ? <BubbleChartIcon className={classes.icon} /> :
                    null
            }
            {props.ComponentName}
          </Link> : null}

        <Typography color="textPrimary" className={classes.link}>
          {props.PageName === 'Search Results' ? <Search className={classes.icon} />
            : props.PageName === 'View Calendar' ? <CalendarTodayIcon className={classes.icon} /> : props.PageName === 'Advanced Search' ? <Search className={classes.icon} /> : props.PageName === 'Alerts' ? <NotificationImportant className={classes.icon} />
              : props.PageName === 'Manage Users' ?
                <SupervisedUserCircle className={classes.icon} />
                : <Storage className={classes.icon} />

          }
          {props.PageName}
        </Typography>
      </Breadcrumbs>
    </Paper>
  );
}

IconBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(IconBreadcrumbs));