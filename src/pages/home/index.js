import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'

// export default connect(mapStateToProps, mapDispatchToProps)(containerName)}

function HomePage (props) {
  const history = useHistory()
  const goPage = () => {
    console.log(history, props) // xu-log
    // history.push('/count/2/3')
    console.log(props.user) // xu-log
  }
  return (
    <React.Fragment>
      HomePage7777720000
      <button onClick={goPage}>
        测试跳转
      </button>
    </React.Fragment>
  )
}
HomePage.propTypes = {
  user: PropTypes.object
}
export default connect(
  ({ user }) => ({ user }),
  {
    login: () => { }
  }

)(HomePage)
