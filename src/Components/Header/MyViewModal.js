import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './MyViewModal.css';
import { setCurrentView } from '../../Actions/ActionSearchFunction';
import { store } from "../../Store/Store";
import * as types from '../../Actions/ActionTypes';
// import IconButton from '@material-ui/core/IconButton';
import { AccessAlarm, ThreeDRotation,Plus,Close,Add} from '@material-ui/icons';
import { event } from 'd3-selection';
 
const customStyles = {
  content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      position: 'absolute'
  
    // top                   : '50%',
    // left                  : '50%',
    // right                 : 'auto',
    // bottom                : 'auto',
    // marginRight           : '-50%',
    // transform             : 'translate(-50%, -50%)'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#root')
 
class MyViewModal extends React.Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: false
    };
 
    this.openModal = this.openModal.bind(this);
    // this.handleModal = this.handleModal.bind(this);
     this.closeModal = this.closeModal.bind(this);
     this.closeSaveModal=this.closeSaveModal.bind(this)
  }
  closeSaveModal(value,e) {
    this.props.handleModal(value,e);
    this.props.handleOpenClose();
    this.setState({modalIsOpen: false});
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  handleChange=(event)=>{
   // event.preventDefault();
      console.log("event dee",event.target.value)
      const value = event.target.value;
      this.setState({value})
  }
//  handlesubmit=(event)=>{
//     event.preventDefault();
//  }
closeModal() {
  this.setState({modalIsOpen: false});
}
  render() {
      console.log("props new",this.props)
      const value = this.state.value;
    return (
      <div>
          {/* <div className="MyViewModalplus" onClick={this.openModal.bind(this)}>+ Create New View</div> */}
         
          {/* <Plus/> */}
        {/* <button class="MyViewModalplus" onClick={this.openModal}>+</button> */}
        <Modal 
          className="MyViewModal"
          isOpen={this.props.open}
        //   onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          
          <Close className ="MyViewModalClose" onClick={this.props.handleOpenClose}/>
          {/* <button class ="MyViewModalClose" onClick={this.closeModal}>close</button> */}
         
          <form class="MyViewModalForm">
          Name Of View:  <input value={this.state.value}  onChange={this.handleChange} autofocus="true"/>
          <button class= "MyViewModalSave" type="submit" onClick={(e)=>this.closeSaveModal(value,e)} value="Submit" disabled={this.state.value!==undefined && this.state.value!=="" ? false: true}>Save</button>
        {console.log("dfgdfgfgt"+this.state.value)}
          </form>
        </Modal>
      </div>
    );
  }
}
export default MyViewModal;