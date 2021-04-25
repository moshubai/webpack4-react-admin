import React from 'react'
import './style/page-layout.scss'
import PropTypes from 'prop-types'
import LeftMenu from './tepl/left-menu'
import { Avatar, Badge } from 'antd'
import { NotificationOutlined } from '@ant-design/icons'

import logo from '@/assets/image/logo.png'

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    const { children } = this.props
    return (
      <React.Fragment>
        <div className='page_layout'>
          <header className='header'>
            <div className='header_left'>
              <img src={logo} alt='这是LOGO' />
            </div>
            <div className='header_right'>
              <span className='icon'>
                <Badge dot>
                  <NotificationOutlined />
                </Badge>
              </span>
              <span className='icon'>
                <Avatar size={30}>墨</Avatar>
              </span>

            </div>
          </header>
          <section className='layout_container'>
            <div className='layout_left'>
              <LeftMenu />
            </div>
            <div className='layout_right'>{children}</div>
          </section>

        </div>
      </React.Fragment>
    )
  }
}

export default App
