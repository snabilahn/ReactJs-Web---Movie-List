import React, { useContext, useEffect, useState } from 'react';
import { Alert, message, Spin, Button, Layout, Card, Row, Col } from 'antd';
import '../assets/style/style.css'
import { MovieContext } from '../context/MovieContext';
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom"
import LoginPict from '../assets/img/undraw_login_re_4vu2.svg'
import Cookies from "js-cookie"
import { UserContext } from '../context/UserContext';
import axios from "axios"

const Login = () => {
    const { Content } = Layout;
    let [isSpinning, setIsSpinning] = useState(true);

    const {setLoginStatus} = useContext(UserContext)
    const [inputUser, setInputUser] = useState({
      username: "" ,
      password: ""
    })
    let history = useHistory()

    useEffect(() => {
          const timing = setTimeout(() => {
              setIsSpinning(false);
          }, 1500)
          return () => clearTimeout(timing);
      
  }, [ isSpinning, setIsSpinning])

    const handleSubmit = (event) => {
      event.preventDefault()

      let {email, password} = inputUser;

      axios.post(`https://backendexample.sanbersy.com/api/user-login`, 
      { email, password }
      ).then((res) => {
        let token = res.data.token
        let user = res.data.user
        Cookies.set(`token`, token, {expires: 1})
        Cookies.set(`name`, user.name, {expires: 1})
        Cookies.set(`email`, user.email, {expires: 1})
        console.log(inputUser);
        message.success('Login Successful');
        window.location.reload();
        history.push(`/`)
        setLoginStatus(true)
      }).catch((err) => {
        if (err.email !== email || err.password !== password) {
          alert("Email or Password wrong!")
        }
        else {
          alert("Account hasn't register yet!")
        }
        
    })
    }

    const handleChange = (event) => {
      let value = event.target.value;
      let name = event.target.name;

      setInputUser({...inputUser, [name]: value})
    }

    return(
        <>
        <Spin spinning={isSpinning} tip="Loading...">
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <div className="site-card-border-less-wrapper">
            <Row justify="space-around" align="middle">
                <Col >
                    <Card title="Login" bordered={false} style={{ width: 500, textAlign: "center", backgroundColor:"#D3DEDC" }}>
                    <form onSubmit={handleSubmit}> 
                        <input 
                          type="email" 
                          name="email" 
                          value={inputUser.email}
                          placeholder="Email..." 
                          onChange={handleChange}
                          style={{marginBottom: "5%"}}
                        required/>
                        <input 
                          type="password" 
                          name="password" 
                          value={inputUser.password}
                          placeholder="Password..."
                          onChange={handleChange}
                        required/>
                        <Button type="link" htmlType="button" style={{right: "170px"}}><Link to="#">Forgot Password?</Link></Button>
                        <p style={{textAlign: "left"}}>Doesn't have any account yet?<Button type="link" htmlType="button"><Link to="/register">Register</Link></Button></p>
                        <input type="submit" value="Login"/>
                      </form>
                    </Card>
                </Col>
                <Col style={{ marginLeft: '100px' }}>
                    <img src={LoginPict} width="400"/>
                </Col>
            </Row>
            </div>
          </div>
        </Content>
        </Spin>
        </>
    )
}

export default Login;