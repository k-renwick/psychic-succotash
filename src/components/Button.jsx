import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Button({ onClick, children, type, title, className }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={className} type={type} onClick={onClick} title={title}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'submit',
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  color: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  title: PropTypes.string,
  className: PropTypes.string.isRequired,
}

export default styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  margin: 2px;
  border: 1px solid;
  background-color: #ffffff;
  border-color: ${props => props.color || '#530080'};
  color: ${props => props.color || '#530080'};
  outline: none;
  ${props =>
    props.onClick &&
    `cursor: pointer;
    :hover {
      background-color: ${props.color || '#530080'};
      color: #ffffff;
      transition: all 0.3s ease-in-out;
    }
    :active {
      background-color: #272727;
      border-color: #272727;
      color: #ffffff;
    }
    `}
`
