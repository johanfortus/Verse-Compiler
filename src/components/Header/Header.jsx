import React from 'react';
import logo from '../../assets/verse-logo.png'
import './Header.css'

const Header = () => {
    return (
        <div className="header-component">
            <img src={logo} className='logo-icon'></img>
            <span className='logo-title'>Verse Compiler</span>
            
        </div>
    );
};

export default Header;

