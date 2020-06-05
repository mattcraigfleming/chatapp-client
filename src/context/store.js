import React, { createContext } from 'react'

const initialState = {}
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const test = () => {
    console.log('test')
  }

  return <Provider value={{ test }}>{children}</Provider>
}

export { store, StateProvider }
