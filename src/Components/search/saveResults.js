import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import {SearchContent } from '../../Actions/ActionSearchFunction';
import { connect } from 'react-redux';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    color:'#808294'
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    paddingBottom: theme.spacing.unit * 2,
  },
  button:{
    // color:'#808294',
  }
});

class SimpleModal extends React.Component {
  state={
    value:0,
    Name:null,
    Description:null,
    
  }

  handleChange = name => event => {
    console.log(name)
    this.setState({ [name]: event.target.value });
  };
 handleSave =(e)=>{
   e.preventDefault();
    const Keyword = this.props.keyword
    const {Name,Description,value} =this.state;
    this.props.dispatch(SearchContent(Name,Description,Keyword,value))
    this.props.handleClose();
 }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography> */}
        {/* <Button onClick={this.handleOpen}>Open Modal</Button> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper + ' saveWrapper'}>
          <form className={classes.container} noValidate autoComplete="off">
          <div className='saveSearchName'>
          <label>Search Name</label>
          <TextField
          id="outlined-Alert"
          className={classes.textField}
          value={this.state.Name}
          margin="normal"
          variant="outlined"
          name="Name"
          onChange={this.handleChange("Name")}
          />

          </div>
          <div className='saveSearchName'>
          <label>Description</label>
          <TextField
          id="outlined-Description"
          multiline
          rows="3"
          className={classes.textField}
          value={this.state.Description}
          margin="normal"
          variant="outlined"
          name="Description"
          onChange={this.handleChange("Description")}
          />
          </div>
          <div className='saveSearchRadio'>
          {/* <FormLabel component="legend">Gender</FormLabel> */}
          <RadioGroup
            aria-label="type"
            name="value"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange("value")}
          >
            <FormControlLabel className={classes.button} value="1" control={<Radio color="primary" />} label="Public" />
            <FormControlLabel value="0" control={<Radio  color="primary"/>} label="Private" />

          </RadioGroup>
        </div > 
        <div  className='saveSearchButton'>
        <Button  onClick={this.props.handleClose} className={classes.button}>Cancel</Button>
        <Button  variant="contained" onClick={this.handleSave} color="primary">Save</Button>
        </div>
         </form>
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

export default connect()(SimpleModalWrapped);