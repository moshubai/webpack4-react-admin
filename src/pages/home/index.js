import React from 'react'
import { useHistory } from 'react-router-dom'
function HomePage (props) {
  const history = useHistory()
  const goPage = () => {
    console.log(history, props) // xu-log
    history.push('/count')
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
