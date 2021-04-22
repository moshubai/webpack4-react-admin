import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { history } from 'func'

function FormLabel () {
  const onFinish = (values) => {
    console.log('Success:', values)

    history.push('/home')
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
          name='用户名'
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
          name='密码'
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
export default FormLabel
