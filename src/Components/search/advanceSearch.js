import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from '../CIP/GenericComponents/DatePicker/datepicker';
import BreadCrumbs from '../CIP/GenericComponents/BreadCrumbs/breadCrumbs';
import Input from './advanceSearchInput';
import Button from '@material-ui/core/Button';
import { setCurrentView , SavesearchKeyword , SearchContent} from '../../Actions/ActionSearchFunction';
import { store } from "../../Store/Store";
import * as types from '../../Actions/ActionTypes';

const styles = theme => ({
    search: {
        position: 'relative',
       
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit * 3,
          width: 'auto',
        },
        
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        background: '#28254D',
        borderRadius: '2px',
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        width: '500px',
        borderRadius: '24px',
        background: '#fff'
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      root:{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      },
    AdvanceSearch:{
        display:'flex',
        justifyContent:'center',
        margin:'10px'

    },
    expansion:{
      marginTop:'0px',
      boxShadow:'unset !important'
    },
    button: {    
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit,
      textTransform: 'none',
    },
    item:{
      paddingRight:'0'
    },
});

class AdvanceSearch extends Component {
    state={
        checked:[],
        To: new Date('2014-08-18T21:11:54'),
        From:new Date('2014-08-18T21:11:54'),
        Author:'Author',
        Title:'Title',
        Tags:'Tags',
        AlertName:'Alert Name'
    }

 handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        this.setState({checked : newChecked});
        console.log(this.state)
      };
  handleInput=(name,event)=>{
    event.preventDefault();
    console.log(event.target.value,name,'inside handle input')
    this.setState({[name]:event.target.value})
  }

  handleCancel =(event) =>{
    event.preventDefault();
    store.dispatch(setCurrentView(types.HOME, {"userName":null,"tabSelected":0}));
  }

  handleDateChange = (date,name) => {
     console.log('date changed', date, name)
    this.setState({ [name]: date });
  };
  

handleApply = ()=> {
       const Values= this.state
  console.log(this.state,this.props, 'checking final state')
        store.dispatch(SavesearchKeyword(Values));

         this.props.screen!=='prefenrences'&& store.dispatch(setCurrentView(types.SEARCH))
  }
    render () {
   
        const { classes } = this.props;
        const { checked } = this.state;
        return (

            <div>
              {this.props.screen==='prefenrences'?<div>< BreadCrumbs PageName='Alerts' TabName='Home' TabValue ='0'/></div>:<div>< BreadCrumbs PageName='Advanced Search' TabName='Home' TabValue ='0'/></div> }
          <div className="AdvancedWrapper">
            <div className="filterInputsWrapper" >
            <div >
            <div className="SourceTitle">Author and Title</div>
            {this.props.screen==='prefenrences'&&  <div className="filterInputs"><span>Name</span><Input  name='AlertName' handleInput={this.handleInput}/></div>}
              <div className="filterInputs"><span>Author</span><Input  name='Author' handleInput={this.handleInput}/></div>
              <div className="filterInputs"><span>Title</span><Input name='Title'  handleInput={this.handleInput}/></div>
              <div className="filterInputs"><span>Tags</span><Input name='Tags'  handleInput={this.handleInput}/></div>
            </div>
            </div>
            <div className="SourceWrapper sourceWrapperSecond">
            <div className="SourceTitle">Content Source</div>
            <div  className='sourceItems'>
                <List className={classes.root +' listWrapper'}>
                {['Source1',
                'Source2',
                'Source3',
                'Source4',
                'Source5',
                'Source6',
                'Source7',
                'Source8',
                'Source9',
                'Source10',
                'Source11',].map(value => (
                <ListItem className={classes.item} key={value} role={undefined} dense button onClick={ this.handleToggle(value)}>
                <Checkbox color="primary" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
                <ListItemText primary={value} />
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
                </ListItem>
                   ))}
                   </List>
            </div>
            </div>
            
            <div className="DatePickerSearch">
            <div className="DatePickerMargin">{this.props.screen==='prefenrences'?'Alert Period':'Date Range'}</div>
            <div className='datePicker'>
            <DatePicker handleDateChange={this.handleDateChange} label='From' value={this.state.From}/>
            <DatePicker handleDateChange={this.handleDateChange} label='To' value={this.state.To}/>
            </div>
            </div>
            
            <div className='buttonsWrapper'>


            {this.props.screen!=='prefenrences'&&  <Button onClick={this.handleCancel} className={classes.button}
                      
                      >
                        Cancel
                      </Button>}
                         <Button onClick={this.handleApply} className={classes.button}
                          color='primary'
                          variant="contained"
                      >
                        {this.props.screen==='prefenrences'?'Set Alert':'Apply'}
                      </Button>
            </div>
            </div>
            </div>
            
        )
    }
}

export default withStyles(styles)(AdvanceSearch);