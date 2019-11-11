import { observable, computed, action } from 'mobx'

import { TodoModel } from './TodoModel'

export class TodoListModel {
  @observable todos: TodoModel[] = []

  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length
  }

  @action
  addTodo(title: string) {
    this.todos.push(new TodoModel(title))
  }
}
