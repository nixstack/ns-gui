import React from 'react'
import './App.css'
import { Layout } from './layout'
import { MemoryRouter } from 'react-router'
import { RouteLinks, Routes } from './route'
// import DevTools from 'mobx-react-devtools'

const App: React.FC = () => {
  return (
    <MemoryRouter>
      {/* <DevTools /> */}
      <Layout nav={<RouteLinks />} main={<Routes />}></Layout>
    </MemoryRouter>
  )
}

export default App
