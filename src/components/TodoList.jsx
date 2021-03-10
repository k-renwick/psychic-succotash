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
          {store.filter({ status: STATUS.TODO }).map(item => (
            <TodoListItem
              key={item.id}
              name={item.name}
              tags={item.tags}
              status={item.status}
              setStatus={status => store.setStatus(item, status)}
              addTag={() => store.addTag(item)}
              removeTag={content => store.removeTag(item, content)}
              onChange={e => store.setItemName(item, e.target.value)}
              onBlur={e => store.addActionLog(`Changed the name of an item to "${e.target.value}"`)}
              onRemove={() => store.removeItem(item)}
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
          {store.filter({ status: STATUS.IN_PROGRESS }).map(item => (
            <TodoListItem
              key={item.id}
              name={item.name}
              tags={item.tags}
              status={item.status}
              setStatus={status => store.setStatus(item, status)}
              addTag={() => store.addTag(item)}
              removeTag={content => store.removeTag(item, content)}
              onChange={e => store.setItemName(item, e.target.value)}
              onBlur={e => store.addActionLog(`Changed the name of an item to "${e.target.value}"`)}
              onRemove={() => store.removeItem(item)}
            />
          ))}
        </ul>
      </section>
      <footer>
        <hr />
        <h2>Complete Items</h2>
        <ul>
          {store.filter({ status: STATUS.COMPLETE }).map(item => (
            <TodoListItem
              key={item.id}
              name={item.name}
              tags={item.tags}
              status={item.status}
              onRemove={() => store.removeItem(item)}
            />
          ))}
        </ul>
        <section>
          <hr />
          <h2>Action Log</h2>
          {store.actionLogs.map(action => (
            <div>{action}</div>
          ))}
        </section>
        <section>
          <hr />
          <h2>Filter by Tag</h2>
          <div className="filters">
            {store.getUniqueTags().map(tag => (
              <Button
                key={tag.content}
                color={tag.color}
                isActive={store.tagFilter === tag.content}
                title="Click to filter by this tag"
                onClick={() => store.setTagFilter(tag.content)}
              >
                {tag.content}
              </Button>
            ))}
          </div>
        </section>
      </footer>
    </div>
  )
}

function getRandomColour() {
  const colours = ['#ff0000', '#ff8300', '#ffd000', '#00a70d', '#000dff']
  return colours[Math.floor(Math.random() * 5)]
}

function createTodoStore() {
  const self = observable({
    items: [
      {
        id: uuid(),
        name: 'Apply online',
        status: STATUS.COMPLETE,
        tags: [
          { content: 'Hiring', color: '#ffd000' },
          { content: 'First', color: '#00a70d' },
        ],
      },
      {
        id: uuid(),
        name: 'Phone interview with HR',
        status: STATUS.COMPLETE,
        tags: [{ content: 'Hiring', color: '#ffd000' }],
      },
      {
        id: uuid(),
        name: 'In person interview with hiring manager',
        status: STATUS.COMPLETE,
        tags: [{ content: 'Hiring', color: '#ffd000' }],
      },
      {
        id: uuid(),
        name: 'Task',
        status: STATUS.IN_PROGRESS,
        tags: [{ content: 'Hiring', color: '#ffd000' }],
      },
      {
        id: uuid(),
        name: 'Presentation of task',
        status: STATUS.TODO,
        tags: [{ content: 'Hiring', color: '#ffd000' }],
      },
      {
        id: uuid(),
        name: 'References',
        status: STATUS.TODO,
        tags: [{ content: 'Hiring', color: '#ffd000' }],
      },
      {
        id: uuid(),
        name: 'Offer',
        status: STATUS.TODO,
        tags: [{ content: 'Hiring', color: '#ffd000' }],
      },
    ],

    tagFilter: null,

    actionLogs: [],

    addActionLog(action) {
      const time = new Date().toLocaleTimeString('en-ca')
      self.actionLogs.push(`${time} | ${action}`)
    },

    setTagFilter(content) {
      if (self.tagFilter === content) self.tagFilter = null
      else self.tagFilter = content
    },

    filter({ status, tag = self.tagFilter }) {
      let filteredItems = self.items
      if (status) filteredItems = filteredItems.filter(i => i.status === status)
      if (tag) filteredItems = filteredItems.filter(i => i.tags.find(t => t.content === tag))
      return filteredItems
    },

    addItem() {
      self.addActionLog('Added a new item')
      self.items.push({
        id: uuid(),
        name: '',
        status: STATUS.TODO,
        tags: [],
      })
    },

    removeItem(item) {
      self.addActionLog(`Removed item "${item.name}"`)
      self.items = self.items.filter(i => i.id !== item.id)
    },

    setItemName(item, name) {
      self.items.find(i => i.id === item.id).name = name
    },

    setStatus(item, status) {
      self.addActionLog(`Changed the status of item "${item.name}"`)
      self.items.find(i => i.id === item.id).status = status
    },

    addTag(item) {
      // eslint-disable-next-line no-alert
      const content = prompt('Please enter a value for the new tag')
      let error = null
      let tagColor
      self.items.forEach(i => {
        const matchingTag = i.tags.find(t => t.content === content)
        if (matchingTag) tagColor = matchingTag.color
        if (matchingTag && i.id === item.id) error = "You've already added this tag here"
      })
      if (error) {
        self.addActionLog(`Failed to add tag "${content}" to "${item.name}"`)
        // eslint-disable-next-line no-alert
        alert(error)
      } else {
        self.addActionLog(`Added tag "${content}" to "${item.name}"`)
        self.items
          .find(i => i.id === item.id)
          .tags.push({ content, color: tagColor || getRandomColour() })
      }
    },

    removeTag(item, content) {
      self.addActionLog(`Removed tag "${content}" from item "${item.name}"`)
      self.items.find(i => i.id === item.id).tags = item.tags.filter(t => t.content !== content)
    },

    getUniqueTags() {
      const uniqueTags = []
      self.items.forEach(item =>
        item.tags.forEach(tag => {
          if (!uniqueTags.find(t => t.content === tag.content)) uniqueTags.push(tag)
        })
      )
      return uniqueTags
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

  .filters {
    display: flex;
    button {
      border-radius: 15px;
    }
  }
`
