import React, { Suspense, lazy } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import Loadable from 'components/loadable' // 进度条
import Home from 'pages/home'
import PageLayout from 'layout'

// 页面
import Example from './example'

const Login = lazy(() => import('pages/account/login/index.js'))
const NotFound = lazy(() => import('pages/system/error/404.js'))
const routes = [...Example]

export default function Routes () {
  return (
    <>
      <HashRouter>
        <Suspense fallback={Loadable}>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route path='/' component={({ match }) => (
              <PageLayout>
                <Switch>
                  <Route exact path={match.url} component={Home} />
                  {routes}
                  <Route component={NotFound} />
                </Switch>
              </PageLayout>
            )} />
          </Switch>
        </Suspense>
      </HashRouter>
    </>

  )
}
