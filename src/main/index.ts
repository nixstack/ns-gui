import { app, ipcMain } from 'electron'
import { winManager } from './window'
import { Application } from './core'
import * as service from './service'
import * as config from './config'

Application.regist({ winManager, service, config })

app
  .on('ready', () => {
    winManager.create()
  })
  .on('activate', () => {
    console.log('actived...')
  })
  .on('window-all-closed', () => {})
  .on('before-quit', () => {})
  .on('quit', () => {
    console.log('quit...')
  })

ipcMain.on('app-started', () => {})
