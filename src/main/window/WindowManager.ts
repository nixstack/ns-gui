import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { format } from 'url'
import { join } from 'path'
import os from 'os'

/**
 * 窗口管理器
 */
class WindowManager {
  private window!: BrowserWindow
  private options: BrowserWindowConstructorOptions

  constructor() {
    this.options = {
      width: 1400,
      height: 800,
      // frame: false, // 不显示窗口title和menu，Ctrl+Shift+i可打开开发者工具
      resizable: true, // 可重置窗口
      hasShadow: true,
      webPreferences: {
        // webSecurity: false,
        nodeIntegration: true,
        // fs.existsSync is not a function
        preload: join(__dirname, 'render-preload.js') // https://github.com/electron/electron/issues/9920
      }
    }
  }

  public create(options?: BrowserWindow) {
    this.options = Object.assign({}, this.options, options)
    this.window = new BrowserWindow(this.options)

    // if (process.env.NODE_ENV === 'development') {
    //   this.window.loadURL('http://localhost:4000');
    //   this.window.webContents.openDevTools();
    // } else {
    //   this.window.loadURL(format({
    //     pathname: join(process.resourcesPath as string, 'app', 'render', 'index.html'),
    //     protocol: 'file:',
    //     slashes: true,
    //   }));
    // }

    // Electron Security Warning (Insecure Resources) This renderer process loads resources
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
    this.window.loadURL('http://localhost:4000')
    this.window.webContents.openDevTools()
    // https://electronjs.org/docs/tutorial/devtools-extension
    BrowserWindow.addDevToolsExtension(
      join(
        os.homedir(),
        '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.2.0_0'
      )
    )
    // MobX Developer Tools
    // BrowserWindow.addDevToolsExtension(
    //   join(
    //     os.homedir(),
    //     '/AppData/Local/Google/Chrome/User Data/Default/Extensions/pfgnfdagidkfgccljigdamigbcnndkod/0.9.21_0'
    //   )
    // )

    this.window.once('ready-to-show', () => {
      this.window.show()
    })

    this.window.on('closed', () => {
      this.window = null as any
    })

    this.window.webContents.on('crashed', () => {
      console.log('crashed...')
    })
  }

  get() {
    return this.window
  }

  show() {
    this.window.show()
  }

  close() {
    console.log('window closed...')
    this.window.close()
  }

  minimize() {
    this.window.minimize()
  }

  toggleMaximize() {
    const isMaximized = this.window.isMaximized()

    if (isMaximized) {
      this.window.unmaximize()
    } else {
      this.window.maximize()
    }

    console.log('toggle maximize...')
    this.send('app-win-toggle-maximize', {
      msg: 'app-win-toggle-maximize...'
    })

    return !isMaximized
  }

  getSize() {
    return this.window.getSize()
  }

  send(type: string, payload: any) {
    this.window.webContents.send(type, payload)
  }
}

export const winManager = new WindowManager()
