import React, { useContext, useState } from 'react';
import {  message, Layout, Card, Row, Col } from 'antd';
import '../assets/style/style.css'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import { UserContext } from '../context/UserContext';
import axios from "axios"

const ChangePassword = () => {
    const { Content } = Layout;

    const {setLoginStatus} = useContext(UserContext)
    const [inputPassword, setInputPassword] = useState({
        current_password: "" ,
        new_password: "",
        new_confirm_password: ""
    })

    let history = useHistory()

    const handleSubmit = (event) => {
      event.preventDefault()

      let { current_password, new_password, new_confirm_password } = inputPassword;

      axios.post(`https://backendexample.sanbersy.com/api/change-password`, 
      { current_password, new_password, new_confirm_password },
      {
        headers: {
            "Authorization": "Bearer " + Cookies.get('token')
          }
      }
      ).then(() => {
        console.log(inputPassword);
        message.success('Password Changed!');
        history.push(`/`)
        setLoginStatus(true)
      }).catch((err) => {
        if(err) {
          alert(err)
        }
    })
    }

    const handleChange = (event) => {
      let value = event.target.value;
      let name = event.target.name;

      setInputPassword({...inputPassword, [name]: value})
    }

    return(
        <>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <div className="site-layout-background" style={{ padding:"24px 30px", minHeight: 450 }}>
            <div className="site-card-border-less-wrapper">
                <Row justify="center" align="middle">
                    <Col >
                    <Card title="Change Password" bordered={false} style={{ width: "90%", textAlign: "center", backgroundColor:"#D3DEDC" }}>
                    <form onSubmit={handleSubmit}> 
                        <input 
                          type="password" 
                          name="current_password" 
                          minlength="8"
                          value={inputPassword.current_password}
                          placeholder="Current Password..." 
                          onChange={handleChange}
                          style={{"margin-bottom": "2%"}}
                        required/>
                        <input 
                          type="password" 
                          name="new_password" 
                          minlength="8"
                          value={inputPassword.new_password}
                          placeholder="New Password..." 
                          onChange={handleChange}
                          style={{"margin-bottom": "2%"}}
                        required/>
                        <input 
                          type="password" 
                          name="new_confirm_password" 
                          minlength="8"
                          value={inputPassword.new_confirm_password}
                          placeholder="Confirm New Password..."
                          onChange={handleChange}
                          style={{"margin-bottom": "2%"}}
                        required/>
                        <input type="submit" value="Change Password"/>
                      </form>
                    </Card>
                    </Col>
                </Row>
            </div>
          </div>
        </Content>
        </>
    )
}

export default ChangePassword;