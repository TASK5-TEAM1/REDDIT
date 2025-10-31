import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            console.log('Searching for:', searchText);
            setSearchText('');
        }
    };

    return (
        <header style={headerStyle}>
            <Link to="/" style={logoStyle}>
                <span role="img" aria-label="reddit-logo">🔖</span> REDDIT
            </Link>

            <form onSubmit={handleSearch} style={searchFormStyle}>
                <input
                    type="text"
                    placeholder="Search Reddit"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={searchInputStyle}
                />
            </form>

            <div style={authButtonsStyle}>
                <button style={loginButtonStyle}>
                    Log In
                </button>
                <button style={{...loginButtonStyle, ...signupButtonStyle}}>
                    Sign Up
                </button>
            </div>
        </header>
    );
}

export default Header;

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
    position: 'sticky',
    top: 0,
    zIndex: 100,
};

const logoStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#FF4500',
    minWidth: '150px',
};

const searchFormStyle = {
    flexGrow: 1,
    maxWidth: '600px',
    margin: '0 20px',
};

const searchInputStyle = {
    width: '100%',
    padding: '8px 15px',
    borderRadius: '20px',
    border: '1px solid #EDEDED',
    backgroundColor: '#F6F7F8',
    outline: 'none',
};

const authButtonsStyle = {
    display: 'flex',
    gap: '10px',
    minWidth: '150px',
    justifyContent: 'flex-end',
};

const loginButtonStyle = {
    padding: '6px 15px',
    borderRadius: '20px',
    border: '1px solid #0079D3',
    backgroundColor: 'transparent',
    color: '#0079D3',
    fontWeight: 'bold',
    cursor: 'pointer',
};

const signupButtonStyle = {
    backgroundColor: '#0079D3',
    color: 'white',
    border: 'none',
};