// import React from 'react';
import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

function getModalStyle() {
  const top = 50 ;
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
    width: '40%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  menuItem : {
    fontSize: '14px'
  }
});

// class SimpleModal extends React.Component {
  function SimpleModal(props){
      const { classes } = props;
   const[userState,setUserState] = useState({
      id:null,
      firstName:'',
      lastName:'',
      email:'',
      role:'Administrator',
      group:'',
     
    });
// state={
//   id:null,
//   firstName:'',
//   lastName:'',
//   email:'',
//   role:'Administrator',
//   group:'',
 
// }

// componentWillMount(){
// }

useEffect(() => {
  const selectedRow = props.selectedRow;
 if(props.selectedRow !==undefined && props.selectedRow !==null )
  {
   setUserState({
        firstName:selectedRow.firstName,
        lastName:selectedRow.lastName,
        email:selectedRow.email,
        role:selectedRow.role,
        group:selectedRow.group,
        id:selectedRow.id
      })
      
    }else{
      setUserState({
        firstName:'',
        lastName:'',
        email:'',
        role:'',
        group:'',
        id:null
      })
}}, [props.selectedRow])
// commented for class component
// componentWillReceiveProps(nextProps){
//   if (nextProps.selectedRow !==undefined && nextProps.selectedRow !==null ){
//     const selectedRow = nextProps.selectedRow;
//     this.setState({
//       firstName:selectedRow.firstName,
//       lastName:selectedRow.lastName,
//       email:selectedRow.email,
//       role:selectedRow.role,
//       group:selectedRow.group,
//       id:selectedRow.id
//     })
//   }else{
//     this.setState({
//       firstName:'',
//       lastName:'',
//       email:'',
//       role:'',
//       group:'',
//       id:null
//     })
    
//   }

// }
const handleChange = name => event => {
  setUserState({ ... userState ,[name]: event.target.value });
};
/** method for form validation  as per CI-34*/
  const validationEvent = () => {
  // Storing Field Values In Variables
  var firstName = userState.firstName;
  var email = userState.email;
  var lastName = userState.lastName;
  var group = userState.group;
  var role  = userState.role;
  var data = props.data,testMail= true;
  var domainCheck = /.+@(gmail|yahoo|tcs|hotmail|outlook|rediff)\.com$/;
  // Regular Expression For Email
  var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Conditions
  // if(data != '')
  // { 
    if (firstName != '' && email != '' && lastName != '' && group != '' && role != '') 
    {
    if (email.match(emailReg)&& email.match(domainCheck)){
      if(data != '')
      { 
    for(let i=0;i<data.length;i++)
    {
      let item=data[i];
      {
         if (email == item.email){
           alert("Email Id Already registered")
            testMail=true;
            break;
         }else{ 
         testMail=false;
        }
       }}
      }
      else{
        testMail=false;
      }
       if(testMail == false)
       { 
        props.handleSave(userState);
       
       }
    }
  
    else {
    alert('Email is not valid');
    return false;
    }
    }
    else {
      alert("All fields are required.....!");
      return false;
      }
  // }
  // else{
  //   props.handleSave(userState);
  // }
 
}
  // render() {
    

    return (
      <div>
        {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography> */}
        {/* <Button onClick={this.handleOpen}>Open Modal</Button> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={props.open}
          onClose={props.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
          <form className={classes.container}  autoComplete="off">
          <div className='nameWrapper'>
          <div className='saveSearchName'>
          <label>First Name</label>
          <TextField
          id="outlined-bare"
          className={classes.textField}
          // defaultValue="First Name"
          onChange={handleChange("firstName")}
          value={userState.firstName}
          margin="normal"
          variant="outlined"
           />
          </div>
          <div className='saveSearchName'>
          <label>Last Name</label>
          <TextField
          id="outlined-bare"
          className={classes.textField}
          // defaultValue="Last Name"
          onChange={handleChange("lastName")}
          value={userState.lastName}
          margin="normal"
          variant="outlined"
          />
          </div>
          </div>
          <div className='saveSearchName'>
          <label>Email</label>
          <TextField
          id="outlined-bare"
          className={classes.textField}
          // defaultValue="dk.pathak@tcs.com"
          onChange={handleChange("email")}
          value={userState.email}
          margin="normal"
          variant="outlined"
          />
          </div>
          <div className='GroupWrapper'>
        
          <div className='saveSearchName'>
          {/* <FormLabel component="legend">Gender</FormLabel> */}
          <label>User Group</label>

            <Select
            className="UserGroup"
            value={userState.group}
            onChange={handleChange('group')}
            input={
              <OutlinedInput
                // labelWidth={userState.labelWidth}
                name="group"
                id="outlined-age-simple"
              />
            }
          >
            <MenuItem  className={classes.menuItem} value="">
              <em>None</em>
            </MenuItem>
            <MenuItem  className={classes.menuItem} value='Oncology'>Oncology</MenuItem>
            <MenuItem className={classes.menuItem} value='Dermatology'>Dermatology</MenuItem>
            <MenuItem className={classes.menuItem} value='Dermatology'>Gastroenterology</MenuItem>
          </Select>
        </div > 
        <div className='saveSearchName'>
          {/* <FormLabel component="legend">Gender</FormLabel> */}
          <label>Role</label>

            <Select
            className="UserGroup"
            value={userState.role}
            onChange={handleChange('role')}
            input={
              <OutlinedInput
                // labelWidth={userState.labelWidth}
                name="role"
                id="outlined-age-simple"
              />
            }
          >
            <MenuItem className={classes.menuItem} value="">
              <em>None</em>
            </MenuItem>
            <MenuItem  className={classes.menuItem} value='Administrator'>Administrator</MenuItem>
            <MenuItem className={classes.menuItem} value='Consumer'>Consumer</MenuItem>
            <MenuItem className={classes.menuItem}  value='Analyst'>Analyst</MenuItem>
          </Select>
        </div > 
        </div > 

        <div  className='saveSearchButton'>
        <Button  onClick={props.handleClose} >Cancel</Button>
        <Button variant="contained" onClick={validationEvent} color="primary">Save</Button>
        </div>
         </form>
          </div>
        </Modal>
      </div>
    );
  }
// }

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;