import React from 'react'
import { Input } from 'antd'
import { AudioOutlined } from '@ant-design/icons'

const { Search } = Input

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
)

const SearchInput = () => {
  return (
    <Search
      placeholder="Search messages"
      onSearch={(value) => console.log(value)}
      style={{ width: 200 }}
      suffix={suffix}
    />
  )
}

export default SearchInput
