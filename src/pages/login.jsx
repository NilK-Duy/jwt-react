import { Button, Col, Divider, Form, Input, notification, Row } from 'antd'
import { loginApi } from '../utils/api'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../components/context/auth.context'
import { ArrowLeftOutlined } from '@ant-design/icons'

const LoginPage = () => {
  const navigate = useNavigate()
  const {setAuth} = useContext(AuthContext)

  const onFinish = async (values) => {
    const {email, password} = values

    const res = await loginApi(email, password)

    if(res && res.EC === 0) {
      localStorage.setItem("access_token", res.access_token)
      notification.success({
        message: "LOGIN USER",
        description: "Success"
      })
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email ?? "",
          name: res?.user?.name ?? ""
        }
      })
      navigate('/')
    } else {
      notification.error({
        message: "LOGIN USER",
        description: res?.EM ?? "Failed"
      })
    }

  }
  return (
    <div style={{ margin: 50 }}>
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col xs={24} md={16} lg={8}>
          <fieldset style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px"
          }}>
            <legend>Login</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout='vertical'
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Link to={"/"}><ArrowLeftOutlined /> Go back Home Page</Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
            No account? <Link to={"/register"}>Register</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
      
    </div>
  )
}

export default LoginPage
