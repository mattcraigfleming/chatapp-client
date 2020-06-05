import React from 'react'
import Routes from './routes/Routes'
import { StateProvider } from './context/store'

const App = () => {
  return (
    <StateProvider>
      <Routes />
    </StateProvider>
  )
}

export default App
