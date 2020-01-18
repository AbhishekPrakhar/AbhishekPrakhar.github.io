import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';



// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        fontSize: '16px !important'

    },
    ListItem: {
        fontSize: '16px'
    },
    icon1: {
          
         color: "rgb(245, 0, 87)"
    },
    icon2: {
          
     color: "rgb(63, 81, 181)"
     },
    
  });

function OptionList(props) {
    const { classes } = props;
  
  return (
    <div className={classes.root}>
   
      <List component="nav" aria-label="main mailbox folders" className="NavlistItem">
        
        <ListItem  >
         <Typography gutterBottom>All Notifications</Typography>
        </ListItem>

        <Divider />

        <ListItem button className={classes.ListItem}>
        <ListItemIcon>
            <LocalOfferIcon className={classes.icon1}/>
        </ListItemIcon>
          <ListItemText primary="Offer" />
        </ListItem>

        <Divider />

        <ListItem button className={classes.ListItem} >
        <ListItemIcon>
            <ThumbUpIcon className={classes.icon2}/>
          </ListItemIcon>
          <ListItemText primary="Information" />
        </ListItem>

        <Divider />

        <ListItem button>
        <ListItemIcon>
            <NotificationsNoneIcon className={classes.icon1}/>
          </ListItemIcon>
        <ListItemText primary="Alert" />
        </ListItem >

        <Divider />

        <ListItem button>
        <ListItemIcon>
            <ShoppingCartIcon className={classes.icon2}/>
          </ListItemIcon>
          <ListItemText primary="Ecommerce" />
        </ListItem>        

      </List>
      
    </div>
  );
}

OptionList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(OptionList);