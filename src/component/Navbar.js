import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { Dropdown, message, Layout, Menu, Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../assets/style/style.css'
import CustomLogo from '../assets/img/Play.along-logo.png'
import { UserContext } from '../context/UserContext';
import Cookies from "js-cookie"
import { useHistory } from "react-router-dom"

const Navbar = () => {
    const { Header } = Layout;

    let history = useHistory()
    const { loginStatus, setLoginStatus } = useContext(UserContext)

    const handleLogout = () => {
      setLoginStatus(false)
      Cookies.remove('token')
      Cookies.remove('email')
      Cookies.remove('name')
      message.success('Logged Out!');
      history.push('/login')
      window.location.reload()
    }

    const menu = (
      <Menu>
        <Menu.Item key="5">
            <Link to="/change-password">Change Password</Link>
        </Menu.Item>
        <Menu.Item key="6" onClick={handleLogout}>
          <a target="_blank" rel="noopener noreferrer">
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    return(
        <>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: "80px" }}>
              <Button type="text" className="logo"  style={{top:"-10", padding: "0 4px", marginTop: 10}}>
                <Link to="/"><img src={CustomLogo} width="100" /></Link>
              </Button>
              <Menu theme="dark" mode="horizontal" style={{height: "80px"}}>
                <Menu.Item key="1" style={{paddingTop: 10}}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2" style={{paddingTop: 10}}>
                    <Link to="/movies">Movies</Link>
                </Menu.Item>
                <Menu.Item key="3" style={{paddingTop: 10}}>
                    <Link to="/games">Games</Link>
                </Menu.Item>
                {
                  Cookies.get('token') !== undefined && 
                  <>
                    <Menu.Item key="4" style={{ marginLeft: 'auto', paddingTop: 10 }} >
                      <Dropdown style={{ top: '20%'}} overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                          <UserOutlined /> Hi! {Cookies.get('name')}
                        </a>
                      </Dropdown>
                    </Menu.Item>
                  </>
                }

                {
                  Cookies.get('token') === undefined && (
                    <Menu.Item key="4" style={{ marginLeft: 'auto', paddingTop: 10 }}>
                      <Link to="/login">Login</Link>
                    </Menu.Item>
                  )
                }
              </Menu>
            </Header>
        </>
    )
}

export default Navbar;