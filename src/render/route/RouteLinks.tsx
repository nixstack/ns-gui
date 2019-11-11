import React from 'react'
import { List } from '@material-ui/core'
import { ListItemLink } from './ListItemLink'
import {
  PlayForWork,
  Description,
  Settings,
  Usb,
  Build,
  DeviceHub,
  Category,
  Report,
  FileCopy,
  Apps,
  AccountTree
} from '@material-ui/icons'

const RouteLinks = () => {
  return (
    <List>
      <ListItemLink to="/gui/project" primary="项目管理" icon={<Apps />} />
      <ListItemLink to="/gui/model" primary="数据模型" icon={<AccountTree />} />
      <ListItemLink to="/gui/api" primary="接口管理" icon={<Usb />} />
      <ListItemLink to="/gui/design" primary="原型设计" icon={<Category />} />
      <ListItemLink to="/gui/template" primary="模板管理" icon={<FileCopy />} />
      <ListItemLink to="/gui/plugin" primary="插件管理" icon={<DeviceHub />} />
      <ListItemLink to="/gui/test" primary="测试平台" icon={<Report />} />
      <ListItemLink to="/gui/deploy" primary="构建部署" icon={<Build />} />
      <ListItemLink
        to="/gui/playground"
        primary="Playground"
        icon={<PlayForWork />}
      />
      <ListItemLink to="/gui/doc" primary="文档说明" icon={<Description />} />
      <ListItemLink to="/gui/setting" primary="系统设置" icon={<Settings />} />
    </List>
  )
}

export { RouteLinks }
