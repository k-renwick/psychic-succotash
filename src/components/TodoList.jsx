import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { observable } from 'mobx'
import { v4 as uuid } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import TodoListItem from './TodoListItem'

function TodoList({ className }) {
  // eslint-disable-next-line no-use-before-define
  const [store] = useState(createTodoStore)

  return (
    <div className={className}>
      <header>
        <h1 className="title">TODO List Example</h1>
      </header>
      <section>
        <ul>
          {store.activeItems.map(item => (
            <TodoListItem
              key={item.id}
              name={item.name}
              isComplete={item.isComplete}
              onComplete={() => store.setCompleted(item.id)}
              onChange={e => store.setItemName(item.id, e.target.value)}
              onRemove={() => store.removeItem(item.id)}
            />
          ))}
          <Button
            text="Add New Item"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={store.addItem}
          />
        </ul>
      </section>
      <footer>
        <h2 className="completedTitle">Completed Items</h2>
        <ul>
          {store.completedItems.map(item => (
            <TodoListItem
              key={item.id}
              name={item.name}
              isComplete={item.isComplete}
              onComplete={() => store.setCompleted(item.id)}
              onRemove={() => store.removeItem(item.id)}
            />
          ))}
        </ul>
      </footer>
    </div>
  )
}

function createTodoStore() {
  const self = observable({
    items: [
      {
        id: uuid(),
        name: 'Sample item',
        isComplete: false,
      },
    ],

    get activeItems() {
      return self.items.filter(i => !i.isComplete)
    },
    get completedItems() {
      return self.items.filter(i => i.isComplete)
    },

    addItem() {
      self.items.push({
        id: uuid(),
        name: `Item ${self.items.length}`,
      })
    },
    removeItem(idToRemove) {
      self.items = self.items.filter(({ id }) => id !== idToRemove)
    },
    setItemName(id, name) {
      const item = self.items.find(i => i.id === id)
      item.name = name
    },
    setCompleted(id) {
      const item = self.items.find(i => i.id === id)
      item.isComplete = true
    },
  })

  return self
}

TodoList.propTypes = {
  className: PropTypes.string.isRequired,
}

export default styled(observer(TodoList))`
  background-color: lightgray;

  .title {
    color: orange;
  }
`
