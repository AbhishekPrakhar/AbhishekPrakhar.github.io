import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentView } from '../../../Actions/ActionSearchFunction';
import { store } from "../../../Store/Store";
import * as types from '../../../Actions/ActionTypes';
import './LoginStyles.css';
class Login extends Component {
    state={
        userName:'employee@tcs.com',
        password:'password'
    }

    handleSubmit=(event)=>{
        store.dispatch(setCurrentView(types.HOME, {"userName":this.state.userName,"tabSelected":0}));
    }

    handleChange = (event)=>{
       const { name , value }= event.target;
       this.setState({[name]:value})
    }
    render() {
        return (
            <div className="login_container">
            <div className='rl_container'>
            <div className="login_image">
                {/* <span className="login_title">Sign In</span> */}
            </div>
              <form onSubmit={this.handleSubmit} className="form_class">
                  <div className="form_element input_validation">
                      <span className="input_span">Username</span>
                      <input 
                          className="form_input"
                          type="text"
                          name="userName"
                          value={this.state.userName}
                          placeholder="Enter Your Username"
                          onChange={this.handleChange} required
                      /> 
                      <span className="input_focus_span"></span>
                  </div>
                  <div className="form_element input_validation">
                      <span className="input_span">Password</span>
                      <input 
                          className="form_input"
                          type="password"
                          name="password"
                          value={this.state.password}
                          placeholder="Enter Your Password"
                          onChange={this.handleChange} required
                      /> 
                      <span className="input_focus_span"></span>
                  </div>
                  <div className="rememberMe_wrapper ">
                  <div className="remeberMe">
                  <input type="checkbox" className="rememberMe_checkbox"
                   name="rememberMe"
                   id="rememberMe"
                  />
                  <label className="rememberMe_label" htmlFor ="rememberMe">Remember me</label>
                  </div>
                  <div>
                      <a href="#" className="forgot_password">Forgot Password?</a>
                  </div>
                  </div>
                  <div className="loginDiv">
                      <button type="submit" className="login">Login</button>
                  </div>   
              </form>
                
            </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        selectedView: state.CIPReducer.selectedView
    };
}


export default connect(mapStateToProps, null)(Login);
