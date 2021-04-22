import React from 'react'
import './style/login.scss'
import canvasFn from './js/canvas'
import FormLabel from './formLabel'
class LoginPage extends React.Component {
  // constructor (props) {
  //   super(props)
  //   // this.nameInputRef = React.createRef()
  // }

  componentDidMount () {
    const canvasNode = document.getElementById('canvasAnimation')
    canvasFn(canvasNode)
  }

  getNade = () => {
    console.log('1111') // xu-log
    // console.log(this.nameInputRef) // xu-log
  }

  componentWillUnmount () {
    // canvasFn(null)
  }

  render () {
    // const {} = this.props;
    return (
      <React.Fragment>
        <div className='login_warp'>
          <div className='canvas_bg'>
            <canvas id='canvasAnimation' ></canvas>
          </div>
          <div className='l_container'>
            <h4>登录</h4>
            {/* <input type='text' ref={this.nameInputRef} ></input>
            <button onClick={() => this.getNade()}>获取节点</button> */}
            <div className='form_label'>
              <FormLabel/>
            </div>

          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default LoginPage
