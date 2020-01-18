import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Modal from 'react-modal';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { setCurrentView ,RibonTabSelected} from '../../Actions/ActionSearchFunction';
import { store } from "../../Store/Store";
import * as types from '../../Actions/ActionTypes';
import { connect } from 'react-redux';
import MyViewModal from './MyViewModal';
import { event } from 'd3-selection';
const styles = {
  root: {
    flexGrow: 1
  },
  tab:{
    fontSize:"14px"
  }
};
const customStyles = {
  content : {
    // top                   : '50%',
    // left                  : '50%',
    // right                 : 'auto',
    // bottom                : 'auto',
    // // marginRight           : '-50%',
    // transform             : 'translate(-50%, -50%)'
  }
};




class CenteredTabs extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      value: this.props.value,
      opendashboard:false,
      opendashMyViews:false,
      viewList : localStorage.getItem("viewList")!=null?localStorage.getItem("viewList").split(","):["My View 1"],
      count:6,
      modalIsOpen: false,
      open:false,
    };
 
  //  this.openModal = this.openModal.bind(this);
  //  this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    // this.openModal = this.openModal.bind(this);
  }
  
  
  



  handleChange = (event, value) => {
    if (value ===0 || value ===2 || value ===1){
      store.dispatch(setCurrentView(types.HOME, {"userName":this.state.userName,"tabSelected":value}));
      store.dispatch(RibonTabSelected(value));
      this.setState({ value });
    }
    
  };

  componentWillReceiveProps(nextProps){
          nextProps.value !== this.props.value?this.setState({value:nextProps.value}) :console.log(" matched");
          
  }

  handleToggle = () => {
    this.setState(state => ({ opendashboard: !state.opendashboard }));
  };
  handleToggleNotification = ()=>{
    this.setState(state => ({ opendashMyViews: !state.opendashMyViews }));
  }

  handleClose = event => {
    const value =event.target.value;
    if (this.anchorEl.contains(event.target)) {
      return;
    }
   
    this.setState({ opendashboard: false});
    // this.state.opendashMyViews=false;
    
    switch(value){
         case 3:
         case 4:
         case 5:{
          this.setState({value:3})
          store.dispatch(RibonTabSelected(value));
          store.dispatch(setCurrentView(types.HOME, {"userName":this.state.userName,"tabSelected":value}));
          break;
         }
         case 6:
         case 7:
         case 8:{
          this.setState({value:6})
          store.dispatch(RibonTabSelected(6));
          store.dispatch(setCurrentView(types.HOME, {"userName":this.state.userName,"tabSelected":value}));
          break;
         }
         default:{
          break;
         }
           

    }
    // if(value===3){
      
     
    // }
    
  };
//  handleCloseNotification =event => {
//   console.log( "inside view check value" +event.target.value )
//   const value =event.target.value;
//   if (this.anchorEm.contains(event.target)) {
//     return;
//   }
 
//   this.setState({ opendashMyViews: false});
//   if(value ===6){
//     this.setState({value})
//     store.dispatch(setCurrentView(types.HOME, {"userName":this.state.userName,"tabSelected":value}));
//   }
  
// };
handleCloseNotification =event => {
 // alert("In handleCloseNotification");
  const value =event.target.value;
 
  if (this.anchorEm.contains(event.target)) {
    return;
  }
  this.setState({ opendashMyViews: false});
  if(value !== undefined && value!== null){
    
    this.setState({value})
    store.dispatch(setCurrentView(types.HOME, {"userName":this.state.userName,"tabSelected":value,"myViewName": event.target.textContent}));
    store.dispatch(RibonTabSelected(value));
  }
  
};

handleModal(viewName,e){ 
 e.preventDefault();
  this.setState({ opendashMyViews: false});
  this.state.viewList.push(viewName);
  localStorage.setItem("viewList",this.state.viewList)
  store.dispatch(setCurrentView(types.HOME, {"userName":this.state.userName,"tabSelected": 6,"myViewName": viewName}));
  store.dispatch(RibonTabSelected(6));
};


handleOpenCloseModal=()=>{
  this.setState({ opendashMyViews: false, open:!this.state.open});
  
}

  render() {

    const { classes } = this.props;
    const { opendashboard , opendashMyViews} =this.state;
    let {count} =this.state;
    const renderDashboard = (
      <Popper open={opendashboard} anchorEl={this.anchorEl} transition disablePortal className='submenuRibbon'>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem value ={3} onClick={this.handleClose}>Pipeline Dashboard</MenuItem>
                      <MenuItem value ={5} onClick={this.handleClose}>Clinical Trials Dashboard</MenuItem>
                      <MenuItem value ={4} onClick={this.handleClose}>Usages Analytics Dashboard</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          )
    const renderMyViews = (
      <Popper open={opendashMyViews} anchorEl={this.anchorEm} transition disablePortal className='submenuRibbonNotification'>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow1"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleCloseNotification} >
                    <MenuList>
                      
                    {/* {<MenuItem value={6}>
                      <MyViewModal   handleModal =  {this.handleModal.bind(this)}/>
                       </MenuItem>} */}

                    {<MenuItem onClick={this.handleOpenCloseModal} value="6"
                    
                    >+ Create New View </MenuItem>}
                    {/* { this.state.viewList.map((x,index) => <MenuItem key={index} value={count++} onClick={this.handleCloseNotification}>{x} </MenuItem>)} */}
                    { localStorage.getItem("viewList")==null?
                      
                      this.state.viewList.map((x,index) => <MenuItem key={index}  value="6" onClick={this.handleCloseNotification}>{x} </MenuItem>)
                      :localStorage.getItem("viewList").split(",").map((x,index) => <MenuItem key={index}  value="6" onClick={this.handleCloseNotification}>{x} </MenuItem>)
                      }
                      {/* <MenuItem value={6} onClick={this.handleCloseNotification}>My Views 1 </MenuItem>
                      <MenuItem value={7} onClick={this.handleCloseNotification}>My Views 2 </MenuItem>
                      <MenuItem value={8} onClick={this.handleCloseNotification}>My Views 3 </MenuItem> */}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
              
            )}
            
          </Popper>

          )



    return (
      <div className="ribbonWrapper">
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tab}  >
          <Tab value={0} className={classes.tab} label="Home" />
          <Tab value={1} className={classes.tab} label="Disease Area" />
          <Tab value={2} className={classes.tab} label="Brand View" />
          <Tab value={3} className={classes.tab} 
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={opendashboard ? 'menu-list-grow' : undefined}
            aria-haspopup="true"

          onClick={this.handleToggle}
          label="Dashboards" />
          <Tab value={6} className={classes.tab} 
          buttonRef={node => {
            this.anchorEm = node;
          }}
          aria-owns={opendashMyViews ? 'menu-list-grow1' : undefined}
            aria-haspopup="true"

          onClick={this.handleToggleNotification}       
          label="My Views" />
     {/* <MyViewModal  handleModal ={this.handleViewModal.bind(this)} closeHandle ={this.closeModal.bind(this)} openModal ={this.openModal.bind(this)} modalIsOpen={this.state.modalIsOpen}/> */}
     {/* <MyViewModal  handleModal ={this.handleViewModal.bind(this)} closeHandle ={this.closeModal.bind(this)} openModal ={this.openModal.bind(this)} modalIsOpen={this.state.modalIsOpen}/> */}
     {/* <MyViewModal  handleModal ={this.handleViewModal.bind(this)}/> */}

        </Tabs>
        {renderMyViews}
      </Paper>
      {renderDashboard}
      <MyViewModal handleOpenClose={this.handleOpenCloseModal} open= {this.state.open} handleModal={this.handleModal.bind(this)} className={customStyles}/>
      
      </div>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    value: state.ribbonSelectedTab
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CenteredTabs));