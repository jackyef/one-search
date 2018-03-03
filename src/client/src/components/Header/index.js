import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { fixed, title } = this.props;
    const style = {
      top: 0,
      right: 0,
      left: 0,
      width: '100%',
      height: '52px',
      color: 'white',
      backgroundColor: '#42B549',
      WebkitBoxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.15)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.15)',
      display: 'flex',
      msFlexAlign: 'center',
      alignItems: 'center',
      padding: '16px',
      fontSize: '1.15em',
    }

    if (fixed) style.position = 'fixed';

    const spacerStyle = {
      height: '52px',
    }

    return (
      <div>
        <div style={style}>{title}</div>
        {fixed && <div style={spacerStyle} />}
      </div>
    )
  }
}

export default Header;
