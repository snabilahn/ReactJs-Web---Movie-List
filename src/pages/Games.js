import React, { useContext, useEffect } from 'react';
import { Skeleton, Layout, Card, Col, Row, Typography, Button } from 'antd';
import '../assets/style/style.css'
import { MovieContext } from '../context/MovieContext';
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom"

const Games = () => {
    const { Content } = Layout;
    const { Title } = Typography;

    let history = useHistory()

    const { dataGame ,fetchStatus, setFetchStatus, isLoading, setIsLoading, functions } = useContext(MovieContext);
    const {fetchDataGame} = functions;

    useEffect(() => {

        if(fetchStatus) {
            const timing = setTimeout(() => {
                fetchDataGame();
                setFetchStatus(false);
                setIsLoading(false);
            }, 4000)
            return () => clearTimeout(timing);
        }

    }, [fetchStatus, setFetchStatus, isLoading, setIsLoading])

    const handleDetailGame = (event) => {
        let idGame = parseInt(event.currentTarget.value)
        history.push(`/games/${idGame}`)
    }

    return(
        <>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 10 }}>
              
              <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <div className="site-card-border-less-wrapper">
                <Title style={{ textAlign: 'center' }}>Games</Title>
                    <Row style={{margin: "0 20px"}}>
                        <Skeleton loading={isLoading} active>
                            {
                                dataGame.map(game => {
                                    return(
                                        <>
                                            <Col style={{marginRight: "2%"}}>
                                              <Card
                                                hoverable
                                                style={{ width: 240, marginTop: 30, textAlign: "center"  }}
                                                cover={<img alt="movie-cover" src={game.image_url} style={{width: "100%", objectFit: "cover", height:" 15vw"}}/>}
                                              >
                                                <Title style={{ textAlign: 'center',fontSize: "150%" }} level={4} className="ant-card-meta-title">{game.name}</Title>
                                                <Title style={{ textAlign: 'center', fontSize: "90%" }} level={5} className="ant-card-meta-title">{game.genre}</Title>
                                                <p style={{ textAlign: 'center', marginBottom: 2, fontWeight: 700 }}>{game.release}</p>
                                                <p style={{ textAlign: 'center', marginBottom: 3 }} className="ant-card-meta-title">Platform: {game.platform}</p>
                                                <Button onClick={handleDetailGame} value={game.id} type='primary'>DETAILS</Button>
                                              </Card>
                                            </Col>
                                        </>
                                    )
                                })
                            }
                            </Skeleton>
                        </Row>
                </div>
              </div>
            </Content>
        </>
    )
}
export default Games;