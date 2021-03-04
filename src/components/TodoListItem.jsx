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
  color: red;
`
