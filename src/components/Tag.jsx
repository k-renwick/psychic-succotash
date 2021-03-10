import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from './Button'

function Tag({ onClick, color, title, children, className }) {
  return (
    <Button className={className} color={color} onClick={onClick} title={title}>
      {children}
    </Button>
  )
}

Tag.propTypes = {
  onClick: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  color: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default styled(Tag)`
  height: 1rem;
  border-radius: 10px;
  padding: 0 3px;
  font-size: 0.6rem !important;
  border-color: ${props => props.color || '#530080'};
  color: ${props => props.color || '#530080'};
  svg {
    font-size: 0.6rem;
    margin: 0;
  }
`
