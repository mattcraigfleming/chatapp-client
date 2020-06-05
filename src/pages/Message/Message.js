import React, { useEffect } from 'react'
import { Avatar, Divider, Row, Col, Card, List } from 'antd'
import moment from 'moment'
import SearchInput from '../../components/Messages/SearchInput'
import Chat from '../../components/Messages/Chat'

const data = [
  {
    id: 1,
    name: {
      first: 'matt',
      last: 'test',
    },
    email: 'test@test.com',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    id: 2,
    name: {
      first: 'matt',
      last: 'test',
    },
    email: 'test@test.com',
    avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
  },
  {
    id: 3,
    name: {
      first: 'matt',
      last: 'test',
    },
    email: 'test@test.com',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
]

const Message = () => {
  return (
    <Row>
      <Col>
        <Card style={{ height: '90vh' }}>
          <SearchInput />
          <Divider />
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar size="large" src={item.avatar} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <div>{moment().format('h:mm a')}</div>
              </List.Item>
            )}
          />
          <Divider />
        </Card>
      </Col>
      <Col>
        <Chat />
      </Col>
    </Row>
  )
}

export default Message
