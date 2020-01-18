import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import 'moment-timezone';
import moment from 'moment'
// import {MyLocalOfferIcon, MyNotificationsNoneIcon, MyShoppingCartIcon, MyThumbUpIcon} from './MyIcons';



// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
// });

const styles = theme => ({
  
  icon1: {
    
    color: "rgb(245, 0, 87)"
  },
  icon2: {
    
    color: "rgb(63, 81, 181)"
  },
  message: {
    color: "#34888C"
  }

});

// const icon = (type) => {
//   const { classes } = props;
//   if(type === 'info'){
//     return <ThumbUpIcon className={classes.icon} />
//   }
//   if(type === 'alert'){
//     return <NotificationsNoneIcon />
//   }
//   if(type === 'e-commerce'){
//     return <ShoppingCartIcon />
//   }
//   if(type === 'offer'){
//     return <LocalOfferIcon />
//   }
// }

// const time = (val) => {
//   let check = val.split(" ");
//   let ans;
//   if(check[0] > 24 && check[1] === 'hours'){
//     if(Math.floor(check[0]/24) === 1)
//       ans = Math.floor(check[0]/24) + " day " + check[2];
//     else
//       ans = Math.floor(check[0]/24) + " days " + check[2];
//   }
//   else {
//     ans = check[0] +" "+check[1]+" "+ check[2];
//   }
//   return ans;
// }

const pStyle = {
  color: '#79716b',
  fontSize: '12px',
};

const pTime = {
  color: '#7caa2d',
  float: 'right',
  fontSize: '11px'
};

function NotificationList(props) {
    const { classes } = props;

    const icon = (type) => {
      // const { classes } = props;
      if(type === 'info'){
        return <ThumbUpIcon className={classes.icon2} />
      }
      if(type === 'alert'){
        return <NotificationsNoneIcon className={classes.icon1}/>
      }
      if(type === 'e-commerce'){
        return <ShoppingCartIcon className={classes.icon2}/>
      }
      if(type === 'offer'){
        return <LocalOfferIcon className={classes.icon1}/>
      }
    }

    const timeStamp = props.time;

  return (
    <div className={classes.root}>
        
       <Table className='NotificationList'>
           <TableBody>
               <TableRow>
                  <TableCell style={{paddingRight: 18}}>{icon(props.type)}              
                      
                    
                </TableCell>
                  <TableCell className="tabledata2" color="primary" style={{paddingLeft: 0}}>
                  <Typography className={classes.message} gutterBottom style={{paddingLeft: 0}}>{props.message}</Typography>
                  <Typography style={pStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...</Typography>
                  <Typography style={pTime}>{moment(timeStamp).fromNow()}</Typography>
                  </TableCell>
                  
                   </TableRow>
               </TableBody>
           </Table>
                  
    </div>
  );
}
NotificationList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(NotificationList);