import React from 'react'
import { Layout, Menu } from 'antd'
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
import SearchInput from '../../components/Messages/SearchInput'
import Chat from '../../components/Messages/Chat'

const { Header, Content, Sider } = Layout

class Dashboard extends React.Component {
  state = {
    collapsed: false,
  }

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              #Channel1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              #Channel2
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              #Channel3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <SearchInput />
            <Chat />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Dashboard
