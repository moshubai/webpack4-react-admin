import React from 'react'
import { history } from 'func'

function HomePage () {
  const goPage = () => {
    // console.log(history) // xu-log
    history.push('/login')
  }
  return (
    <React.Fragment>
      HomePage2
      <button onClick={goPage}>
        测试跳转
      </button>
    </React.Fragment>
  )
}
export default HomePage
