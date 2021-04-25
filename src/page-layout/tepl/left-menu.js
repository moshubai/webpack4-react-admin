import React from 'react'
import { Menu } from 'antd'
import { HomeOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons'

const { SubMenu } = Menu
function LeftMenu () {
  const handleClick = e => {
    console.log('click ', e)
  }
  return (
    <React.Fragment>
      <Menu
        onClick={handleClick}
        style={{ width: 240 }}
        mode='inline'
      >
        <Menu.Item key='5' icon={<HomeOutlined />}>首页</Menu.Item>
        <Menu.Item key='53'icon={<EnvironmentOutlined />}>地图</Menu.Item>

        <SubMenu key='sub1' icon={<MailOutlined />} title='图表'>
          <Menu.Item key='9'>表格1</Menu.Item>
          <SubMenu key='sub3' title='按钮'>
            <Menu.Item key='7'>Option 7</Menu.Item>
            <Menu.Item key='8'>Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>

      </Menu>
    </React.Fragment>
  )
}
export default LeftMenu
