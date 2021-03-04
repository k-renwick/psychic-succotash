import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Button({ text, onClick, type, icon, className }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={className} type={type} onClick={onClick}>
      {text}
      {icon}
    </button>
  )
}

Button.defaultProps = {
  type: 'submit',
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  icon: PropTypes.node,
  className: PropTypes.string.isRequired,
}

export default styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  height: 1.4rem;
  border-radius: 3px;
  margin: 2px;
  border: 1px solid;
  background-color: #ffffff;
  border-color: #530080;
  color: #530080;
  outline: none;
  cursor: pointer;
  :hover {
    background-color: #530080;
    color: #ffffff;
    transition: all 0.3s ease-in-out;
  }
`
