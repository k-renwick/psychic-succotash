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
  cursor: pointer;
`
