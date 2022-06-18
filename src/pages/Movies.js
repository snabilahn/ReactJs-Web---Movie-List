import React, { useContext, useEffect } from 'react';
import { Skeleton, Layout, Card, Col, Row, Typography, Button } from 'antd';
import '../assets/style/style.css'
import { MovieContext } from '../context/MovieContext';
import { useHistory } from "react-router-dom"

const Movies = () => {
    const { Content } = Layout;
    const { Title } = Typography;

    let history = useHistory()

    const { dataMovie, fetchStatus, setFetchStatus, isLoading, setIsLoading, functions } = useContext(MovieContext);
    const {fetchDataMovie} = functions;

    useEffect(() => {

        if(fetchStatus) {
            const timing = setTimeout(() => {
                fetchDataMovie();
                setFetchStatus(false);
                setIsLoading(false);
            }, 4000)
            return () => clearTimeout(timing);
        }

    }, [fetchStatus, setFetchStatus, isLoading, setIsLoading])

    const handleDetailMovie = (event) => {
        let idMovie = parseInt(event.currentTarget.value)
        history.push(`/movies/${idMovie}`)
    }

    return(
        <>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 10 }}>
              
              <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <div className="site-card-border-less-wrapper">
                <Title style={{ textAlign: 'center' }}>Movies</Title>
                        <Row style={{margin: "0 20px"}}>
                        <Skeleton loading={isLoading} active>
                            {
                                dataMovie.map(movie => {
                                    return(
                                        <>
                                            <Col style={{marginRight: "2%"}}>
                                              <Card
                                                hoverable
                                                style={{ width: 240, marginTop: 30, textAlign: "center" }}
                                                cover={<img alt="movie-cover" src={movie.image_url} style={{width: "100%", "object-fit": "cover", height:" 15vw"}}/>}
                                              >
                                                <Title style={{ textAlign: 'center', "font-size": "150%" }} className="ant-card-meta-title" level={4}>{movie.title}</Title>
                                                <Title style={{ textAlign: 'center', "font-size": "90%" }} className="ant-card-meta-title" level={5}>{movie.genre}</Title>
                                                <p style={{ textAlign: 'center', marginBottom: 2, fontWeight: 700 }}>{movie.year}</p>
                                                <p style={{ textAlign: 'center', marginBottom: 2 }}>{movie.duration} menit</p>
                                                <Button onClick={handleDetailMovie} value={movie.id} type='primary'>DETAILS</Button>
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

export default Movies;