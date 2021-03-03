import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Button({ text, onClick, type, className }) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {text}
    </button>
  )
}

Button.defaultProps = {
  type: 'submit',
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string.isRequired,
}

export default styled(Button)`
  cursor: pointer;
`
