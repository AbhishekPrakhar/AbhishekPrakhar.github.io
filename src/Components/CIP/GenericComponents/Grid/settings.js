import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 120,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  checkbox:{
      padding:'5px'
  }
});

class SimpleModal extends React.Component {
 
  state = {
    // open: false,
    // checked:[],
   // selectedViews:[]
   selectedViews: this.props.selectedViews!=undefined && this.props.selectedViews.length>0 ? this.props.selectedViews:[]
  };
  
  componentWillReceiveProps(nexProps,prevProps){
    console.log("derived state from props")
   // console.log("prevstate",JSON.stringify(prevState))
    console.log("nexprops",JSON.stringify(nexProps))
    if(nexProps!== prevProps){
      this.setState({selectedViews: nexProps.selectedViews!=undefined && nexProps.selectedViews.length>0 ? nexProps.selectedViews:[]});
    }
    else{
      this.setState({selectedViews: prevProps.selectedViews!=undefined && prevProps.selectedViews.length>0 ? prevProps.selectedViews:[]});
    }
      }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleToggle = (value) => () => {

    const key = this.state.selectedViews;
    console.log("value in toggle",value)
    console.log("selected view in toggle",JSON.stringify(this.state.selectedViews))
    const currentIndex = key.indexOf(value);
    const newChecked = [...key];

    if (currentIndex === -1) {
      console.log("not present  ")
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({selectedViews : newChecked},()=> console.log(this.state.selectedViews));

    console.log(newChecked)
  };

  

  render() { 
    const { classes } = this.props;
    const {selectedViews}= this.state;
    return (
      <div>
        {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {/* <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            {/* <SimpleModalWrapped /> */}
            <div  className='tilesSource'>
              <label>Home: </label>
                <List className={classes.root +' tilesourceWrapper'}>
                {['My Saved Searches',
                'Industry News',
                'Stock Chart',
                'My Alerts',
                'Press Release',
                'Regulatory Watch',
                'Journal Watch',
                'Person Watch',].map(value => (
                <ListItem className={classes.item} key={value} role={undefined} dense button onClick={ this.handleToggle(value)}>
                <Checkbox color="primary" className={classes.checkbox} checked={selectedViews.indexOf(value) !== -1? true : false} tabIndex={-1} disableRipple style={{"padding":"5px"}}/>
                <ListItemText primary={value} />
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
                </ListItem>
                   ))}
                   </List>
            </div>
            <div  className='tilesSource'>
                <label>Disease Area: </label>
                <List className={classes.root +' tilesourceWrapper'}>
                {['Congress Planner',
                'Therapeutic Area Watch',
                'Pipeline',
                'Patent Watch',
                'Launch Estimates',].map(value => (
                <ListItem className={classes.item} key={value} role={undefined} dense button onClick={ this.handleToggle(value)}>

                <Checkbox color="primary" className={classes.checkbox} checked={selectedViews.indexOf(value) !== -1 ? true : false} tabIndex={-1} disableRipple />
                <ListItemText primary={value} />
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
                </ListItem>
                   ))}
                   </List>
            </div>
            <div  className='tilesSource'>
                <label>Brand View: </label>
                <List className={classes.root +' tilesourceWrapper'}>
                {['Product Information',
                'Licensing',
                'Brand News',
                'Sales & Contribution',
                'Market Size',
                'Clinical Trial',
                'Social Media Metrics',
               ].map(value => (
                <ListItem className={classes.item} key={value} role={undefined} dense button onClick={ this.handleToggle(value)} disabled ={value=="Product Information" || value=="Licensing" ?true:false}>
                <Checkbox color="primary" className={classes.checkbox} checked={selectedViews.indexOf(value) !== -1 ? true : false} tabIndex={-1} disableRipple/>
                <ListItemText primary={value} />
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
                </ListItem>
                   ))}
                   </List>
            </div>
            <div  className='saveSettingsButton'>
                <Button  onClick={this.props.handleClose} >Cancel</Button>
                <Button variant="contained" onClick={()=>this.props.handleSave(this.state)} color="primary" disabled={this.state.selectedViews!=undefined && this.state.selectedViews.length==0 ? true :false}>Save</Button>
        </div>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;