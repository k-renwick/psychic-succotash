import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'

function TodoListItem({ className, name, onComplete, onChange }) {
  return (
    <li className={className}>
      <button onClick={onComplete}>Done?</button>
      <input onChange={onChange} value={name} />
    </li>
  )
}

TodoListItem.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default styled(observer(TodoListItem))`
  color: red;
`
