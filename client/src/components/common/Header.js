import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="active-link" exact> Home </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" activeClassName="active-link"> About </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings" activeClassName="active-link"> Settings </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
