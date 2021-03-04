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

const STATUS = { TODO: 1, IN_PROGRESS: 2, COMPLETE: 3 }

function TodoList({ className }) {
  // eslint-disable-next-line no-use-before-define
  const [store] = useState(createTodoStore)

  return (
    <div className={className}>
      <header>
        <h1 className="title">TODO List Example</h1>
      </header>
      <section>
        <h2>To Do Items</h2>
        <ul>
          {store.filterByStatus(STATUS.TODO).map(item => (
            <TodoListItem
              key={item.id}
              name={item.name}
              status={item.status}
              setStatus={status => store.setStatus(item.id, status)}
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
      <section>
        <hr />
        <h2>In Progress Items</h2>
        <ul>
          {store.filterByStatus(STATUS.IN_PROGRESS).map(item => (
            <TodoListItem
              key={item.id}
              name={item.name}
              status={item.status}
              setStatus={status => store.setStatus(item.id, status)}
              onChange={e => store.setItemName(item.id, e.target.value)}
              onRemove={() => store.removeItem(item.id)}
            />
          ))}
        </ul>
      </section>
      <footer>
        <hr />
        <h2>Complete Items</h2>
        <ul>
          {store.filterByStatus(STATUS.COMPLETE).map(item => (
            <TodoListItem
              key={item.id}
              name={item.name}
              status={item.status}
              setStatus={status => store.setStatus(item.id, status)}
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
      { id: uuid(), name: 'Bread', status: STATUS.TODO },
      { id: uuid(), name: 'Milk', status: STATUS.TODO },
      { id: uuid(), name: 'Butter', status: STATUS.TODO },
      { id: uuid(), name: 'Eggs', status: STATUS.IN_PROGRESS },
      { id: uuid(), name: 'Bananas', status: STATUS.COMPLETE },
    ],

    filterByStatus(status) {
      return self.items.filter(i => i.status === status)
    },

    addItem() {
      self.items.push({
        id: uuid(),
        name: '',
        status: STATUS.TODO,
      })
    },
    removeItem(id) {
      self.items = self.items.filter(i => i.id !== id)
    },
    setItemName(id, name) {
      const item = self.items.find(i => i.id === id)
      item.name = name
    },
    setStatus(id, status) {
      const item = self.items.find(i => i.id === id)
      item.status = status
    },
  })

  return self
}

TodoList.propTypes = {
  className: PropTypes.string.isRequired,
}

export default styled(observer(TodoList))`
  border: 1px solid #530080;
  border-radius: 5px;
  padding: 1rem;

  * {
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 1rem;
  }

  svg {
    margin: 0 5px;
  }
  .title {
    color: #530080;
    font-size: 1.5rem;
  }
  ul {
    list-style-type: none;
    padding-left: 10px;
  }
  button {
    margin-top: 1rem;
  }
`
