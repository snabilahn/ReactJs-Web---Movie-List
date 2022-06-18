import React, { useContext, useEffect } from 'react';
import { Skeleton, Layout, Card, Col, Row, Typography, Button, Image, Descriptions } from 'antd';
import '../assets/style/style.css'
import { MovieContext } from '../context/MovieContext';
import {Link} from 'react-router-dom'
import { useParams } from "react-router-dom"
import axios from "axios"

const DetailGame = () => {
    const { Content } = Layout;
    const { Title } = Typography;

    const { dataGame, isLoading, setIsLoading, functions, setCurrentIndex, setDataGame } = useContext(MovieContext);

    const {fetchDataGame} = functions;

    const { slug } = useParams()
    console.log(slug)

    useEffect(() => {

        if (slug !== undefined) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${slug}`)
                .then((res) => {
                    let data = res.data
                    setDataGame({
                        id: data.id,
                        name: data.name,
                        genre: data.genre,
                        release: data.release,
                        platform: data.platform,
                        singlePlayer: data.singlePlayer,
                        multiplayer: data.multiplayer,
                        image_url: data.image_url
                    })
                    setCurrentIndex(data.id)
                    const timing = setTimeout(() => {
                        setIsLoading(false)
                    }, 4000)
                    return () => clearTimeout(timing);
                })
        }

        return () => {
            setCurrentIndex(-1);
            
        }

    }, [isLoading, setIsLoading])

    const handleTextSingle = (singleParam) => {
        if (singleParam) {
            return "Yes"
        } 
        else {
            return "No"
        }
    }

    const handleTextMulti = (multiParam) => {
        if (multiParam) {
            return "Yes"
        } 
        else {
            return "No"
        }
    }



    return(
        <>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 10 }}>
            <div className="site-layout-background" style={{ padding: 50, minHeight: 380}}>
                <Row justify="space-around" align="middle">
                    <Col span={10}>
                    { isLoading ? <Skeleton.Image active/> : 
                    <Image
                      width={400}
                      src={dataGame.image_url}
                    />
                    }
                    </Col>
                    
                    <Col span={10}>
                    <Skeleton loading={isLoading} active>
                        <Title level={2}>{dataGame.name}</Title>
                        <Title level={4}>{dataGame.release}</Title>
                        <Descriptions layout="horizontal">
                            <Descriptions.Item label="Genre" span={3}>{dataGame.genre}</Descriptions.Item>
                            <Descriptions.Item label="Platform" span={3}>{dataGame.platform}</Descriptions.Item>
                            <Descriptions.Item label="Single Player" span={3}>{handleTextSingle(dataGame.singlePlayer)}</Descriptions.Item>
                            <Descriptions.Item label="Multi Player">{handleTextMulti(dataGame.multiplayer)}</Descriptions.Item>
                        </Descriptions>
                    </Skeleton>
                    </Col>
                </Row>
            </div>
        </Content>
        </>
    )
}

export default DetailGame;