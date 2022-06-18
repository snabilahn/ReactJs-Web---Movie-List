import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './component/Navbar';
import Home from './pages/Home';
import { Layout, Menu } from 'antd';
import Footer from './component/Footer';
import { MovieProvider } from './context/MovieContext';
import Movies from './pages/Movies';
import Games from './pages/Games';
import DetailMovie from './pages/DetailMovie';
import DetailGame from './pages/DetailGame';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserProvider } from './context/UserContext';
import Cookies from "js-cookie"
import MovieList from './pages/MovieList';
import Sidebar from './component/Sidebar';
import GameList from './pages/GameList';
import MovieForm from './pages/MovieForm';
import GameForm from './pages/GameForm';
import ChangePassword from './pages/ChangePassword';

const Routes = () => {
    const { Content } = Layout;

    const LoginRoute = ({...props}) => {
        if ( Cookies.get('token') !== undefined) {
            return <Redirect path="/"/>
        } else {
            return <Route {...props}/>
        }
    }

    return(
        <>
            <BrowserRouter>
            <UserProvider>
            <MovieProvider>
                <Layout>
                    <Navbar/>
                    <Content style={{ padding: '0 50px', marginTop: 100 }}>
                        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                            {
                              Cookies.get('token') !== undefined && <Sidebar/>
                            }
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/movies' exact component={Movies}/>
                        <Route path='/games' exact component={Games}/>
                        <LoginRoute path='/login' exact component={Login} />
                        <LoginRoute path='/register' exact component={Register}/>
                        <Route path='/change-password' exact component={ChangePassword} />
                        <Route path='/movies/:slug' exact component={DetailMovie}/>
                        <Route path='/games/:slug' exact component={DetailGame}/>
                        <Route path='/movie-list' exact component={MovieList}/>
                        <Route path='/game-list' exact component={GameList}/>
                        <Route path='/add-movie' exact component={MovieForm}/>
                        <Route path='/add-game' exact component={GameForm}/>
                        <Route path={'/movie/edit/:slug'} exact component={MovieForm} />
                        <Route path={'/game/edit/:slug'} exact component={GameForm} />
                    </Switch>
                    </Layout>
                    </Content>
                    <Footer/>
                </Layout>
            </MovieProvider>
            </UserProvider>
            </BrowserRouter>
        </>
    )
}

export default Routes