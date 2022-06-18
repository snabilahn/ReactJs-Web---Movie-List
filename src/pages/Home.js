import React, { useContext, useEffect, useState } from 'react';
import { Skeleton, Layout, Card, Col, Row, Typography, Button } from 'antd';
import '../assets/style/style.css'
import { MovieContext } from '../context/MovieContext';
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import Sidebar from '../component/Sidebar';

const Home = () => {
    const { Content } = Layout;
    const { Title } = Typography;

    let history = useHistory()

    const { dataMovie, dataGame ,fetchStatus, setFetchStatus, isLoading, setIsLoading, functions } = useContext(MovieContext);
    const {fetchDataMovie, fetchDataGame} = functions;

    useEffect(() => {
        
        if(fetchStatus) {
            const timing = setTimeout(() => {
                fetchDataMovie();
                fetchDataGame();
                setIsLoading(false);
                setFetchStatus(false);
            }, 4000)
            return () => clearTimeout(timing);
        }
        
    }, [fetchStatus, setFetchStatus, isLoading, setIsLoading])

    const handleDetailMovie = (event) => {
        let idMovie = parseInt(event.currentTarget.value)
        history.push(`/movies/${idMovie}`)
    }

    const handleDetailGame = (event) => {
        let idGame = parseInt(event.currentTarget.value)
        history.push(`/games/${idGame}`)
    }


    return(
        <>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <div className="site-card-border-less-wrapper">
                    <Card title="Movies" bordered={false} style={{ width: "100%" }} extra={<Link to="/movies">More</Link>}>
                    
                        <Row style={{margin: "0 30px"}}>
                        <Skeleton loading={isLoading} active>
                            {
                                dataMovie.filter((movie, index) => index < 8).map(movie => {
                                    return(
                                        <>
                                            <Col style={{marginRight: "2%"}}>
                                                <Card
                                                    hoverable
                                                    style={{ width: 240, marginTop: 30, textAlign: "center" }}
                                                    cover={<img alt="movie-cover" src={movie.image_url} style={{width: "100%", objectFit: "cover", height:" 15vw"}} />}
                                                >
                                                        <Title level={4} style={{fontSize: "150%"}} className="ant-card-meta-title">{movie.title}</Title>
                                                        <Title level={5} style={{fontSize: "90%"}}>{movie.genre}</Title>
                                                        <p style={{ marginBottom: 2, fontWeight: 700 }}>{movie.year}</p>
                                                        <p style={{ marginBottom: 3 }}>{movie.duration} menit</p>
                                                        <Button onClick={handleDetailMovie} value={movie.id} type='primary'>DETAILS</Button>
                                                    
                                                  </Card>
                                                </Col>
                                                </>
                                            )
                                        })
                                    }
                            </Skeleton>
                        </Row>
                    </Card>
                            <Card title="Games" bordered={false} style={{ width: "100%" }} extra={<Link to="/games">More</Link>}>
                            <Row style={{margin: "0 30px"}}>
                            <Skeleton loading={isLoading} active>
                                {
                                    dataGame.filter((game, index) => index < 8).map(game => {
                                        return(
                                            <>
                                                <Col style={{marginRight: "2%"}}>
                                                  <Card
                                                    hoverable
                                                    style={{ width: 240, "margin-top": 30, textAlign: "center" }}
                                                    cover={<img alt="movie-cover" src={game.image_url} style={{width: "100%", objectFit: "cover", height:" 15vw"}}/>}
                                                  >
                                                        <Title level={4} style={{fontSize: "150%"}} className="ant-card-meta-title">{game.name}</Title>
                                                        <Title level={5} style={{fontSize: "90%"}}>{game.genre}</Title>
                                                        <p style={{ marginBottom: 2, fontWeight: 700 }}>{game.release}</p>
                                                        <Button onClick={handleDetailGame} value={game.id} type='primary'>DETAILS</Button>
                                                  </Card>
                                                </Col>
                                            </>
                                        )
                                    })
                                }
                            </Skeleton>
                            </Row>
                        </Card>
                    </div>
                </div>
                {/* </Spin> */}
            </Content>
        </>
    )
}

export default Home;