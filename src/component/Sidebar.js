import React from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu, Button } from 'antd';

const Sidebar = () => {
    const {  Sider } = Layout;
    const { SubMenu } = Menu;
    
    return(
        <>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" title="Movies">
                    <Menu.Item key="1">
                        <Link to="/movie-list">Movie Lists</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/add-movie">Add Data Movie</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title="Games">
                    <Menu.Item key="3">
                        <Link to="/game-list">Game Lists</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/add-game">Add Data Game</Link>
                    </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
        </>
    )
}

export default Sidebar