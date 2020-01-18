import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.css';
import Logo from '../../Assets/Footer/TataFooterLogo.png';
class Footer extends Component {
    render() {
        return (
            <div className="footerWrapper">
            <div className='footerLogo'><img  className='footerLogo' src={Logo} alt='TCS' /> </div>
            </div>
        )
    }
}

export default connect(null, null)(Footer);
