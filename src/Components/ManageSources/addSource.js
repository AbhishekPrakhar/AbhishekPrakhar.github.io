import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import MultiSelect from '../CIP/GenericComponents/MultiSelect/multiselect';


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
});


const Tags = [
    "do", "deserunt", "ex", "occaecat","labore", "sint" ,"est" ,"aute", "dolor", "aliquip","duis" ];

class SimpleModal extends React.Component {


state={
  _id:null,
  source:'',
  title:'',
  tags:[],
  type:''
}

componentWillMount(){
  console.log(this.props,'checking on mounting')
}
componentWillReceiveProps(nextProps){
  console.log(nextProps,'checking on mounting')
  if (nextProps.selectedRow !==undefined && nextProps.selectedRow !==null ){
    const selectedRow = nextProps.selectedRow;
    this.setState({
        source:selectedRow.source,
        title:selectedRow.title,
        tags:selectedRow.tags,
        type:selectedRow.type,
        _id:selectedRow._id
    })
  }else{
    this.setState({
        source:'',
        title:'',
        tags:[],
        type:'',
        _id:null
    })
    
  }

}





handleChange = name => event => {
  console.log(name,event)

//   console.log(name, event.target.value)
//   console.log(name, event.target.value)
name ==='multi'?this.setState({ tags: event }):
  this.setState({ [name]: event.target.value });
  console.log(this.state.value)
  
};
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
          <div style={getModalStyle()} className={classes.paper}>
          <form className={classes.container} noValidate autoComplete="off">
          {/* <div className='nameWrapper'> */}
          <div className='saveSearchName'>
          <label>Enter a valid URL</label>
          <TextField
          id="outlined-bare"
          className={classes.textField}
          // defaultValue="First Name"
          onChange={this.handleChange("source")}
          value={this.state.source}
          margin="normal"
          variant="outlined"
          />
          </div>
          <div className='saveSearchName'>
          <label>Enter Display Name</label>
          <TextField
          id="outlined-bare"
          className={classes.textField}
          // defaultValue="Last Name"
          onChange={this.handleChange("title")}
          value={this.state.title}
          margin="normal"
          variant="outlined"
          />
          </div>
          {/* </div> */}
          <div>
          <MultiSelect handleChange={this.handleChange} className='multiSelectTags' Options={Tags} Value={this.state.tags} label='Add default tags with source' />
          </div>

          {/* <div className='GroupWrapper'> */}
        
          <div className='saveSearchName'>
          {/* <FormLabel component="legend">Gender</FormLabel> */}
          <label>Source Type</label>

            <Select
            className="UserGroup"
            value={this.state.type}
            onChange={this.handleChange('type')}
            input={
              <OutlinedInput
                // labelWidth={this.state.labelWidth}
                name="group"
                id="outlined-age-simple"
              />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value='rss'>RSS</MenuItem>
            <MenuItem value='news'>News</MenuItem>
            <MenuItem value='twitter'>Twitter</MenuItem>
            <MenuItem value='googleplus'>GooglePlus</MenuItem>
            <MenuItem value='youtube'>Youtube</MenuItem>    
          </Select>
        </div > 
        {/* <div className='saveSearchName'> */}
          {/* <FormLabel component="legend">Gender</FormLabel> */}
          {/* <label>Role</label> */}

            {/* <Select
            className="UserGroup"
            value={this.state.role}
            onChange={this.handleChange('role')}
            input={
              <OutlinedInput */}
                {/* // labelWidth={this.state.labelWidth}
        //         name="role"
        //         id="outlined-age-simple"
        //       />
        //     }
        //   >
        //     <MenuItem value="">
        //       <em>None</em>
        //     </MenuItem>
        //     <MenuItem value='Administrator'>Administrator</MenuItem>
        //     <MenuItem value='Consumer'>Consumer</MenuItem>
        //     <MenuItem value='Analyst'>Analyst</MenuItem>
        //   </Select>
        // </div >  */}
        {/* </div >  */}

        <div  className='saveSearchButton'>
        <Button  onClick={this.props.handleClose} >Cancel</Button>
        <Button variant="contained" onClick={()=>this.props.handleSave(this.state)} color="primary">Save</Button>
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

export default SimpleModalWrapped;