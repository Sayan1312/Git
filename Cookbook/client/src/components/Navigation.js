import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Navigation() {
  const breadcrumbStyle = {
    background: '#DDA0DD',
    padding: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontSize: '18px',
  };

  return (
    <div style={breadcrumbStyle}>
      <Breadcrumb.Item style={{ listStyle: 'none', margin: '0', padding: 0, marginRight: '5px' }}>
        <Link to="/" style={linkStyle}>Recipes</Link>
      </Breadcrumb.Item>
    </div>
  );
}

export default Navigation;