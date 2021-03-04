import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faTimes, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

function TodoListItem({ name, isComplete, onChange, onRemove, onComplete, className }) {
  return (
    <li className={className}>
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
  width: 20rem;
  height: 1.4rem;
  border-radius: 3px;
  margin: 2px;
  border: 1px solid;
  background: ${props =>
    !props.isComplete ? 'linear-gradient(to left, #530080 50%, #f6e7ff 50%) right' : '#cccccc'};
  border-color: ${props => (!props.isComplete ? '#530080' : '##808080')};
  color: ${props => (!props.isComplete ? '#ffffff' : '#808080')};

  background-size: 200%;
  transition: 0.5s ease-out;
  ${props =>
    !props.isComplete &&
    `:focus-within, :hover {
        background-color: #f6e7ff;
        color: #530080;
        background-position: left;
    }`}

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

  .remove-icon {
    cursor: pointer;
    ${props => !props.isComplete && 'color: #ff0000'};
    :hover {
      transition: all 0.3s ease-out;
      color: #940404;
    }
  }

  .complete-icon {
    cursor: pointer;
    color: #008000;
    :hover {
      transition: all 0.3s ease-out;
      color: #003e00;
    }
  }
`
