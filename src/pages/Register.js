import React, { useContext, useEffect, useState } from 'react';
import { Button, Layout, Card, Row, Col } from 'antd';
import '../assets/style/style.css'
import {Link} from 'react-router-dom'
import axios from "axios"
import { useHistory } from "react-router-dom"
import LoginPict from '../assets/img/undraw_login_re_4vu2.svg'

const Register = () => {
    const { Content } = Layout;

    let history = useHistory()

    const [inputUser, setInputUser] = useState({
      name: "",
      email: "",
      password: ""
    })

    const handleChange = (event) => {
      let value = event.target.value;
      let name = event.target.name;

      setInputUser({...inputUser, [name]: value})
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      axios.post("https://backendexample.sanbersy.com/api/register", {
        name: inputUser.name, 
        email: inputUser.email, 
        password: inputUser.password
      })
      .then(() => {
        console.log(inputUser);
        history.push(`/login`)
      }).catch((err) => {
        if(err) {
          alert("Akun sudah terdaftar!")
        }
    })
    }

    return(
        <>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <div className="site-card-border-less-wrapper">
            <Row justify="space-around" align="middle">
                <Col >
                    <Card title="Create Account" bordered={false} style={{ width: 500, textAlign: "center", backgroundColor:"#D3DEDC" }}>
                      <form onSubmit={handleSubmit}> 
                        <input 
                          type="text" 
                          name="name" 
                          value={inputUser.name} 
                          placeholder="Name..." 
                          onChange={handleChange}
                          style={{marginBottom: "5%"}}
                        required/>
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
                        <p style={{textAlign: "left"}}>Already have account?<Button type="link" htmlType="button"><Link to="/login">Login</Link></Button></p>
                        <input type="submit" value="Register"/>
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
        </>
    )
}

export default Register;