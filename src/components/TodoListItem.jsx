import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faTimes, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

function TodoListItem({ name, isComplete, onChange, onRemove, onComplete, className }) {
  return (
    <li className={`${className}${isComplete ? ' isComplete' : ''}`}>
      <FontAwesomeIcon
        icon={isComplete ? faCheckSquare : faSquare}
        className="complete-icon"
        onClick={onComplete}
      />
      <input onChange={onChange} value={name} disabled={isComplete} />
      <FontAwesomeIcon icon={faTimes} onClick={onRemove} className="remove-icon" />
    </li>
  )
}

TodoListItem.propTypes = {
  name: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onRemove: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}

export default styled(observer(TodoListItem))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25rem;
  height: 1.4rem;
  margin: 2px;
  border: 1px solid;
  border-radius: 3px;
  border-color: #530080;
  background: linear-gradient(to left, #530080 50%, #f6e7ff 50%) right;
  background-size: 200%;
  color: #ffffff;
  transition: 0.5s ease-out;

  input {
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    display: flex;
    align-items: center;
    color: inherit;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
  }

  svg {
    cursor: pointer;
  }

  .remove-icon {
    color: #ff0000;
    :hover {
      transition: all 0.3s ease-out;
      color: #940404;
    }
  }

  .complete-icon {
    color: #008000;
    :hover {
      transition: all 0.3s ease-out;
      color: #003e00;
    }
  }

  &:not(.isComplete) {
    :focus-within,
    :hover {
      background-color: #f6e7ff;
      color: #530080;
      background-position: left;
    }
  }

  &.isComplete {
    border-color: #808080;
    background: #cccccc;
    color: #808080;
    svg {
      color: #808080;
    }
  }
`
