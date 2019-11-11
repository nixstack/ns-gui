import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { Todo } from './Todo'
import { TodoListModel, TodoModel } from '../model'

@observer
class TodoList extends Component {
  @observable newTodoTitle = ''
  @observable store = new TodoListModel()

  componentDidMount() {
    this.store.addTodo('Get Coffee')
    this.store.addTodo('Write simpler code')
    this.store.todos[0].finished = true

    setTimeout(() => {
      this.store.addTodo('Get a cookie as well')
    }, 2000)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input
            type="text"
            value={this.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <hr />
        <ul>
          {this.store.todos.map((todo: TodoModel) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.store.unfinishedTodoCount}
      </div>
    )
  }

  @action
  handleInputChange = (e: { target: { value: string } }) => {
    this.newTodoTitle = e.target.value
  }

  @action
  handleFormSubmit = (e: { preventDefault: () => void }) => {
    this.store.addTodo(this.newTodoTitle)
    this.newTodoTitle = ''
    e.preventDefault()
  }
}

export { TodoList }
