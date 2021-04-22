import React, { Component } from 'react'
// import store from "../store/";
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import ReactReduxHookPage from './ReactReduxHookPage'

// 使用react-redux的情况

// @connect(
//   // mapStateToProps
//   // ({count})=>({count})
//   (state) => ({ count: state.count }),
//   // mapDispatchToProps  function | object
//   dispatch => {
//     let creators = {
//       add: () => ({ type: 'ADD' }),
//       minus: () => ({ type: 'MINUS' }),
//       addFn: () => ({ type: 'ADD', payload: 100 }),
//     }
//     creators = bindActionCreators(creators, dispatch)
//     return { dispatch, ...creators }
//   }

// )
class ReduxPage extends Component {
  componentDidMount () { }

  componentWillUnmount () { }

  render () {
    console.log('this.props', this.props) // log
    // const { count, add, minus, addFn } = this.props
    return (
            <div>
                <h3>ReduxPage</h3>
                {/* <p>{count}</p>
                <button onClick={add}>加法</button>
                <button onClick={minus}>减法</button>
                <button onClick={addFn}>简单的第二个</button>
                <ReactReduxHookPage /> */}
            </div>
    )
  }
}

export default ReduxPage
