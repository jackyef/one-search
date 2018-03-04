import React, { Component } from 'react';

class TextField extends Component {
  render() {
    const {
      setRef,
      style,
      type, 
      placeholder, 
      onChange, 
      onKeyDown, 
      className,
      hasButton,
      buttonIcon,
      buttonAction
    } = this.props;

    const buttonStyle = {
      width: '24px',
      height: '24px',
      objectFit: 'contain,'
    }
    const button = hasButton ?
      (
        <img src={buttonIcon} style={buttonStyle} onClick={buttonAction} alt='search' />
      )
      : null;

    const inputStyle = {
      width: !hasButton ? '100%' : 'calc(100% - 24px)'
    }

    return (
      <div style={style}>
        <input
          ref={setRef}
          type={type || 'text'} 
          className={className}
          style={inputStyle}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown} 
        />
        {button}
      </div>
    )
  }
}

export default TextField;
