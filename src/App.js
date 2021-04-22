import React, { Suspense, lazy } from 'react'
import './styles/index.scss'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Loadable from 'components/loadable' // 进度条
import { Provider } from 'react-redux'
import store from './store/index'
import Home from 'pages/home'
import PageLayout from 'layout'
import Base from 'routes'
import zhCN from 'antd/es/locale-provider/zh_CN'
import ErrorBoundary from 'components/error-boundary'
const Login = lazy(() => import('pages/account/login/index.js'))
const NotFound = lazy(() => import('pages/system/error/404.js'))

class App extends React.PureComponent {
  render () {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <ConfigProvider locale={zhCN}>
            <HashRouter>
              <Suspense fallback={Loadable}>
                <Switch>
                  <Route exact path='/login' component={Login} />
                  <Route path='/' component={({ match }) => (
                    <PageLayout>
                      <Switch>
                        <Route exact path={match.url} component={Home} />
                        {Base}
                        <Route component={NotFound} />
                      </Switch>
                    </PageLayout>
                  )} />
                </Switch>
              </Suspense>
            </HashRouter>
          </ConfigProvider>
        </Provider>
      </ErrorBoundary>
    )
  }
}
export default App
