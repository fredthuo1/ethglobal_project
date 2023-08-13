import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/" activeClassName="active-link"> Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about" activeClassName="active-link"> About </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/settings" activeClassName="active-link"> Settings </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
