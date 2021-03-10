import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import {
  faCheckSquare,
  faTimes,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons'

function TodoListItem({ name, status, setStatus, onChange, onRemove, className }) {
  const isTodo = status === 1
  const isInProgress = status === 2
  const isComplete = status === 3

  return (
    <li className={`${className}${isComplete ? ' isComplete' : ''}`}>
      {isComplete ? (
        <FontAwesomeIcon
          title="This item is complete"
          icon={faCheckSquare}
          className="complete-icon"
        />
      ) : (
        <FontAwesomeIcon
          title={`${isInProgress ? 'Click to complete item' : 'This item is not complete'}`}
          onClick={() => isInProgress && setStatus(3)}
          icon={faSquare}
          className="complete-icon"
        />
      )}

      <input onChange={onChange} value={name} disabled={isComplete} readOnly={!onChange} />

      {isInProgress && (
        <FontAwesomeIcon
          title="Click to move item back to todo"
          onClick={() => setStatus(1)}
          icon={faArrowUp}
        />
      )}
      {isTodo && (
        <FontAwesomeIcon
          title="Click to move item to in progress"
          onClick={() => setStatus(2)}
          icon={faArrowDown}
        />
      )}

      <FontAwesomeIcon
        title="Click to remove item"
        onClick={onRemove}
        icon={faTimes}
        className="remove-icon"
      />
    </li>
  )
}

TodoListItem.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf([1, 2, 3]).isRequired,
  onChange: PropTypes.func,
  onRemove: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}

export default styled(observer(TodoListItem))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20rem;
  height: 1.4rem;
  margin: 2px;
  padding: 0 3px;
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
    margin: 0 3px;
    display: flex;
    align-items: center;
    color: inherit;
    width: -webkit-fill-available;
    min-width: 4rem;
    height: -webkit-fill-available;
  }

  .add-tag-button {
    height: 1rem;
    border-radius: 10px;
    padding: 0 3px;
    svg {
      font-size: 0.6rem;
      margin: 0;
    }
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
