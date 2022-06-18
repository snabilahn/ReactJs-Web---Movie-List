import React, { useContext, useEffect } from 'react';
import { Skeleton, Layout, Card, Col, Row, Typography, Button, Image, Descriptions } from 'antd';
import '../assets/style/style.css'
import { MovieContext } from '../context/MovieContext';
import {Link} from 'react-router-dom'
import { useParams } from "react-router-dom"
import axios from "axios"

const DetailMovie = () => {
    const { Content } = Layout;
    const { Title } = Typography;

    const { dataMovie, isLoading, setIsLoading, functions, setCurrentIndex, setDataMovie, setInputMovie, inputMovie } = useContext(MovieContext);

    const {fetchDataMovie} = functions;

    const { slug } = useParams()
    console.log(slug)

    useEffect(() => {

        if (slug !== undefined) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${slug}`)
                .then((res) => {
                    let data = res.data
                    setDataMovie({
                        id: data.id,
                        title: data.title,
                        genre: data.genre,
                        year: data.year,
                        duration: data.duration,
                        rating: data.rating,
                        review: data.review,
                        image_url: data.image_url,
                        description: data.description
                    })
                    setCurrentIndex(data.id)
                    const timing = setTimeout(() => {
                        setIsLoading(false)
                    }, 4000)
                    return () => clearTimeout(timing);
                })
        }

        console.log(dataMovie);


        return () => {
            setCurrentIndex(-1);
        }

    }, [isLoading, setIsLoading])


    return(
        <>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 10 }}>
            <div className="site-layout-background" style={{ padding: 50, minHeight: 380 }}>
                <Row justify="space-around" align="middle"> 
                    <Col span={5}>
                    { isLoading ? <Skeleton.Image active/> :
                        <Image
                          width={300}
                          src={dataMovie.image_url}
                        />
                    }
                    </Col>
                    
                    <Col span={10}>
                    <Skeleton loading={isLoading} active>
                        <Title level={2}>{dataMovie.title}</Title>
                        <Title level={4}>{dataMovie.year}</Title>
                        <Descriptions layout="horizontal">
                          <Descriptions.Item label="Genre" span={3}>{dataMovie.genre}</Descriptions.Item>
                          <Descriptions.Item label="Duration" span={3}>{dataMovie.duration}</Descriptions.Item>
                          <Descriptions.Item label="Rating" span={3}>{dataMovie.rating}</Descriptions.Item>
                          <Descriptions.Item label="Description" span={3}>
                            {dataMovie.description}
                          </Descriptions.Item>
                          <Descriptions.Item label="Review">
                            {dataMovie.review}
                          </Descriptions.Item>
                        </Descriptions>
                    </Skeleton>
                    </Col>
                </Row>
            </div>
        </Content>
        </>
    )
}

export default DetailMovie;