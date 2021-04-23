// import React from 'react'
// import { Route, Redirect } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// // PrivateRoute.prototypes = {
// //   isLogin: PropTypes.bool
// // }
// function PrivateRoute ({ isLogin, component: Component, ...restProps }) {
//   console.log('isLogin', isLogin) // log
//   return <Route
//     {...restProps}
//     render={(props) =>
//       isLogin
//         ? (<Component {...props} />)
//         : (<Redirect
//           to={{ pathname: '/login', state: { from: props.location.pathname } }}
//         />)
//     }
//   />
// }
// export default connect(({ user }) => ({ isLogin: user.isLogin }))(PrivateRoute)
