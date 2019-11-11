interface RegisterOption {
  service?: {}
  config?: {}
  winManager?: {}
}

export class Application {
  // 注册全局窗口/服务/配置等
  static regist(option: RegisterOption) {
    Object.assign(global, option)
  }
}
