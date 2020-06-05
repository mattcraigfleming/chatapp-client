import React, { useState, useEffect } from 'react'
import { Button, Card, Input, PageHeader, Divider } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useSocket } from '../../hooks/useSocket'
import './chat.css'

const Chat = () => {
  const [typing, setTyping] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, addMessages] = useState([])
  const socket = useSocket('http://127.0.0.1:5000')
  useEffect(() => {
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
      socket.emit('chatMessage', message)
      setMessage('')
      setTyping(false)
    }
  }

  const handleSubmitMessage = () => {
    socket.emit('chatMessage', message)
    setMessage('')
    setTyping(false)
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
        <div className="message">
          <figure class="avatar">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" />
          </figure>
          <span className="message-content">This is an external message</span>
          <div className="timestamp">28/12/1989</div>
        </div>

        {typing && (
          <div className="message">
            <figure class="avatar">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" />
            </figure>
            <span className="message-content">Typing ...</span>
          </div>
        )}

        {messages.map((mes) => (
          <div className="message message-personal">
            <div className="message-content">{mes.text}</div>
            <div className="timestamp">{mes.time}</div>
            <div className="username">{mes.username}</div>
          </div>
        ))}
      </div>
      <Divider />
      <Input
        addonAfter={<SendOutlined onClick={() => handleSubmitMessage()} />}
        placeholder="Type something ...."
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={message}
      />
    </Card>
  )
}

export default Chat
