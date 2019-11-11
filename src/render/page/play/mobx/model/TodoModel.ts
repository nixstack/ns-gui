import { observable } from 'mobx'

export class TodoModel {
  id = Math.random()
  @observable title: string
  @observable finished: boolean = false

  constructor(title: string) {
    this.title = title
  }
}
