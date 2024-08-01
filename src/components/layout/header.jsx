import { useContext, useState } from 'react'
import {  HomeOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';


const Header = () => {

  const navigate = useNavigate()
  const { auth, setAuth } = useContext(AuthContext)
  console.log('🚀 ~ Header ~ auth:', auth)
  const items = [
    {
      label: <Link to={"/"}>Home Page</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    ...(auth.isAuthenticated ? [{
      label: <Link to={"/user"}>Users</Link>,
      key: 'user',
      icon: <UsergroupAddOutlined />,
    }] : []),

    {
      label: `Welcome ${auth?.user?.name}`,
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        ...(auth.isAuthenticated ? [{
          label: <span onClick={() => {
            localStorage.clear("access-token")
            setCurrent("home")
            setAuth({
              isAuthenticated: false,
              user: {
                email: "",
                name: ""
              }
            })
            navigate("/")
          }}>Log out</span>,
          key: 'logout',
        },] : [{
          label: <Link to={"/login"}>Log in</Link>,
          key: 'login',
        },]),
      ],
    },
  ]

  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
};
export default Header