import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Header(props, context) {
    return (
        <header className="header">
        <div className="container">
        <div className="header-left">
        <Link className="header-item" to="/" onClick={props.handleLogoClick}>HOME</Link>
        </div>
        </div>
        </header>
    );
}

Header.contextTypes = {
    router: React.PropTypes.object,
};

Header.propTypes = {
    onClick: PropTypes.func.isRequired,
    handleLogoClick: PropTypes.func,
};

export default Header;
