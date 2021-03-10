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
              tags={item.tags}
              status={item.status}
              setStatus={status => store.setStatus(item.id, status)}
              addTag={() => store.addTag(item.id)}
              removeTag={content => store.removeTag(item.id, content)}
              onChange={e => store.setItemName(item.id, e.target.value)}
              onRemove={() => store.removeItem(item.id)}
            />
          ))}
          <Button
            title="Click to add a new item to the todo list"
            className="add-button"
            onClick={store.addItem}
          >
            Add New Item <FontAwesomeIcon icon={faPlus} />
          </Button>
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
              tags={item.tags}
              status={item.status}
              setStatus={status => store.setStatus(item.id, status)}
              addTag={() => store.addTag(item.id)}
              removeTag={content => store.removeTag(item.id, content)}
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
              tags={item.tags}
              status={item.status}
              onRemove={() => store.removeItem(item.id)}
            />
          ))}
        </ul>
      </footer>
    </div>
  )
}

function getRandomColour() {
  const colours = ['#ff0000', '#ff8300', '#ffd000', '	#00a70d', '#000dff']
  return colours[Math.floor(Math.random() * 5)]
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
        tags: [],
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

    /* eslint-disable no-alert */
    addTag(id) {
      const content = prompt('Please enter a value for the new tag')
      let error = null
      let tagColor
      self.items.forEach(i => {
        const matchingTag = i.tags.find(t => t.content === content)
        if (matchingTag) tagColor = matchingTag.color
        if (matchingTag && i.id === id) error = "You've already added this tag here"
      })
      if (error) alert(error)
      else {
        const item = self.items.find(i => i.id === id)
        item.tags.push({ content, color: tagColor || getRandomColour() })
      }
    },
    /* eslint-enable no-alert */

    removeTag(id, content) {
      const item = self.items.find(i => i.id === id)
      item.tags = item.tags.filter(t => t.content !== content)
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
    margin: 0 3px;
  }
  .title {
    color: #530080;
    font-size: 1.5rem;
  }
  ul {
    list-style-type: none;
    padding-left: 10px;
  }
  .add-button {
    margin-top: 1rem;
    height: 1.4rem;
    border-radius: 3px;
  }
`
