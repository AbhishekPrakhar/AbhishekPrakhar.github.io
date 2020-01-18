import React,{ Component} from 'react';
import './ViewAllNotification.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BreadCrumbs from '../GenericComponents/BreadCrumbs/breadCrumbs';
// import Header from './header.js';
// import BreadCrumbs from '../GenericComponents/BreadCrumbs/breadCrumbs';
import NotificationList from './NotificationList'; 
import Typography from '@material-ui/core/Typography';
import OptionList from './OptionList.js'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
// import Footer from './footer.js'
import { createMuiTheme } from '@material-ui/core/styles';



// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       // light: will be calculated from palette.primary.main,
//       main: '#34888C',
//       // dark: will be calculated from palette.primary.main,
//       // contrastText: will be calculated to contrast with palette.primary.main
//     },
//     secondary: {
//       light: '#0066ff',
//       main: '#0044ff',
//       // dark: will be calculated from palette.secondary.main,
//       contrastText: '#ffcc00',
//     },
//     // error: will use the default color
//   },
// });

const styles = theme => ({
  
  notiHead: {
    fontColor: "#34888C"
  }
  
  
});


class ViewAllNotification extends Component {

  state = {
    notifications : [
      { id: 1, color: "secondary", type: "offer", message: "Check out this awesome ticket", time: "2019-08-30T12:26:00" },
      {
        id: 2,
        color: "primary",
        type: "info",
        message: "What is the best way to get ...",
        time: "2019-08-30T12:16:00"
      },
      {
        id: 3,
        color: "secondary",
        type: "alert",
        message: "This is just a notification",
        time: "2019-08-30T12:08:00"
      },
      {
        id: 4,
        color: "primary",
        type: "e-commerce",
        message: "12 orders has arrived today",
        time: "2019-08-30T11:55:00"
      },
      {
          id: 5,
          color: "secondary",
          type: "e-commerce",
          message: "12 orders cancelled",
          time: "2019-08-30T11:16:00"
      },
      {
          id: 6,
          color: "primary",
          type: "alert",
          message: "Notification for you",
          time: "2019-08-29T12:16:00"
      },
      {
        id: 7,
        color: "primary",
        type: "info",
        message: "Most used medicines for..",
        time: "2019-08-27T12:16:00"
    },
    {
      id: 8,
      color: "primary",
      type: "offer",
      message: "Get discount on food..",
      time: "2019-08-25T12:16:00"
  }
    ]
  };

 

  render() {
    const {classes} = this.props;

  return (
    
    <div className="ViewAllNotification">
      {/* <Header /> */}
      <BreadCrumbs TabName='Home' TabValue = '0' PageName = 'View All Notification'/>
      <Grid container>
        <Grid items sm={3}>
          <Paper style={{ marginTop: 50, marginBottom: 50, marginLeft: 20, marginRight: 10, borderRadius: 0}}>
          <OptionList />
          </Paper>
        </Grid>
        <Grid items sm={9}>
        <Paper style={{ marginTop: 50, marginBottom: 20, marginLeft: 10, marginRight: 20, borderRadius: 0}}>   
        <div className="options2">
           <Typography className="notiHead" style={{paddingLeft: 20, paddingTop: 10}} gutterBottom>All Notifications</Typography>
           <Divider />
           {this.state.notifications.map(notification => (
                 <NotificationList
                     message={notification.message}
                     time={notification.time}
                     type={notification.type}
                 />
     
             ))}
        </div>
        </Paper>
        </Grid>
      </Grid>  
        
      
      {/* <Footer /> */}
    </div>
   
  );
}
}

function mapStateToProps(state) {
    return {
        selectedEvent: state.selectedEvent,
        classes: PropTypes.object.isRequired
    }
}

export default connect(mapStateToProps)(ViewAllNotification);
