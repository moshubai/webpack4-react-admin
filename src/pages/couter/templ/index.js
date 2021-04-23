import React, { Component } from 'react'
// import store from '../../../store'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import ReactReduxHookPage from './ReactReduxHookPage'

@connect(
  //   // mapStateToProps
  //   // ({count})=>({count})
  (state) => ({ count: state.count }),
  //   // mapDispatchToProps  function | object
  dispatch => {
    let creators = {
      add: () => ({ type: 'ADD' }),
      minus: () => ({ type: 'MINUS' }),
      addFn: () => ({ type: 'ADD', payload: 100 }),
    }
    creators = bindActionCreators(creators, dispatch)
    return { dispatch, ...creators }
  }

)
class ReduxPage extends Component {
  static propTypes = {
    count: PropTypes.number,
    add: PropTypes.func,
    minus: PropTypes.func,
    addFn: PropTypes.func,
    location: PropTypes.object
  }

  componentDidMount () {
    //
  }

  componentWillUnmount () { }

  render () {
    console.log('this.props', this.props) // log
    const { count, add, minus, addFn, location } = this.props
    return (
      <div>
        <h3>ReduxPage2-使用react-redux的情况</h3>
        {/* <h4>传递参数{location.state.id}</h4> */}
        {/* <h4>传递参数{location.query.id}</h4> */}
        {/* <h4>传递参数{location.search}</h4> */}

        <p>{count}</p>
        <button onClick={add}>加法</button>
        <button onClick={minus}>减法</button>
        <button onClick={addFn}>简单的第二个</button>
        <ReactReduxHookPage />
      </div>
    )
  }
}

export default ReduxPage
