import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import Api from 'Api'
import { login } from '@/store/account/func'
import { connect } from 'react-redux'

function FormLabel (props) {
  const history = useHistory()
  const onFinish = (values) => {
    console.log('Success:', values, props)
    const { login } = props
    login(values)

    history.push('/')
    // const { username, password } = values
    // Api.AccountLogin({
    //   username,
    //   password
    // })
    //   .then(res => {
    //     console.log('res', res) // xu-log
    //     // util.cookies.set('token', res.token)
    //
    //   })
    //   .catch(err => {
    //     console.log('err', err) // xu-log
    //   })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <React.Fragment>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input size='large' placeholder='用户名:admin' prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input
            size='large'
            prefix={<LockOutlined />}
            type='password'
            placeholder='密码'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            登录
          </Button>

        </Form.Item>
      </Form>
    </React.Fragment>
  )
}

FormLabel.propTypes = {
  login: PropTypes.func,
}
export default connect(
  ({ user }) => ({ isLogin: user.isLogin }),
  {
    login
  }

)(FormLabel)
