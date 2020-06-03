import React, { useEffect } from 'react'
import { useSocket } from './hooks/useSocket'

const App = () => {
  const socket = useSocket('http://127.0.0.1:5000')
  useEffect(() => {
    const handleEvent = (payload) => {
      console.log(payload)
    }
    if (socket) {
      socket.on('message', handleEvent)
    }
  }, [socket])

  return <div>This works</div>
}

export default App
