import React, { useState, useEffect, useContext } from 'react'
import { Button, Card, Input, PageHeader, Divider } from 'antd'
import moment from 'moment'
import { SendOutlined } from '@ant-design/icons'
import { useSocket } from '../../hooks/useSocket'
import { store } from '../../context/store.js'
import './chat.css'

const Chat = () => {
  const [typing, setTyping] = useState(false)
  const [message, setMessage] = useState('')
  const [placeholder, setPlaceholder] = useState('Type something...')
  const [botMessages, setBotMessage] = useState([])
  const [messages, addMessages] = useState([])
  const globalState = useContext(store)
  const socket = useSocket('http://127.0.0.1:5000')

  useEffect(() => {
    console.log(globalState)
    const handleEvent = (payload) => {
      addMessages((prevState) => [...prevState, payload])
    }
    const handleTimeout = () => {
      setTyping(!typing)
    }
    if (socket) {
      socket.on('message', handleEvent)
      socket.on('typing', handleTimeout)
    }
  }, [socket])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const botCommand = message.charAt(0)
      if (botCommand === '/') {
        var s2 = message.substr(1)
        if (s2 === 'time') {
          setBotMessage([
            ...botMessages,
            { text: `Current GMT Time: ${moment().format('hh:mm a')}` },
          ])
        } else {
          setMessage('')
          setPlaceholder(`{{ Command ${s2}, not found! }}`)
        }
        console.log(s2)
      } else {
        socket.emit('chatMessage', message)
        setMessage('')
        setTyping(false)
      }
    }
  }

  const handleSubmitMessage = () => {
    const botCommand = message.charAt(0)
    if (botCommand === '/') {
      console.log('bot command')
    } else {
      socket.emit('chatMessage', message)
      setMessage('')
      setTyping(false)
    }
  }

  const handleChange = ({ target: { value } }) => {
    setMessage(value)
    setTyping(true)
  }

  return (
    <Card style={{ width: '65%' }}>
      <PageHeader
        title="ChatApp Design Team"
        className="site-page-header"
        subTitle="Space to share design ideas"
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
        avatar={{
          src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
        }}
      />
      <Divider />
      <div
        className="messages"
        style={{ height: '30vh', overflowY: 'scroll', padding: 20 }}
      >
        {botMessages.map((mes) => (
          <div className={`message`}>
            <div className="message-content">{mes.text}</div>
            <div className="timestamp">{mes.time}</div>
            <div className="username">BOT</div>
          </div>
        ))}
        {messages.map((mes) => (
          <div
            className={`message ${
              mes.username === 'USER:' ? `message-personal` : ''
            }`}
          >
            <div className="message-content">{mes.text}</div>
            <div className="timestamp">{mes.time}</div>
            <div className="username">{mes.username}</div>
          </div>
        ))}
      </div>
      <Divider />
      <Input
        addonAfter={<SendOutlined onClick={() => handleSubmitMessage()} />}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={message}
      />
    </Card>
  )
}

export default Chat
