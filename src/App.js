import React from 'react'
import './styles/index.scss'
import { ConfigProvider } from 'antd'

import { Provider } from 'react-redux'
import store from './store/index'

import Router from 'routes'
import zhCN from 'antd/es/locale-provider/zh_CN'
import ErrorBoundary from 'components/error-boundary'

class App extends React.PureComponent {
  render () {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <ConfigProvider locale={zhCN}>
            <Router/>
          </ConfigProvider>
        </Provider>
      </ErrorBoundary>
    )
  }
}
export default App
