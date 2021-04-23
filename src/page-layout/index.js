import React from 'react'
import './style/page-layout.scss'
import PropTypes from 'prop-types'
import LeftMenu from './tepl/left-menu'

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    const { children } = this.props
    return (
      <React.Fragment>
        <div className='page_layout'>
          <div className='layout_left'>
            <LeftMenu />
          </div>
          <div className='layout_right'>{children}</div>
        </div>
      </React.Fragment>
    )
  }
}

export default App
