import React, { useContext, useEffect } from 'react';
import { Layout, Typography, Checkbox, Form, message } from 'antd';
import '../assets/style/style.css'
import axios from "axios"
import { useHistory } from "react-router-dom"
import { MovieContext } from '../context/MovieContext';
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"

const GameForm = () => {
    const { Content } = Layout;
    const { Title } = Typography;
    let history = useHistory()

    const { slug } = useParams()
    console.log(slug)

    const { 
        inputGame, setInputGame, currentIndex, setCurrentIndex, functions, setFetchStatus
    } = useContext(MovieContext);

    const { functionUpdateGame } = functions;

    useEffect(() => {
        if (slug !== undefined) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${slug}`)
                .then((res) => {
                    let data = res.data
                    setInputGame({
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
                })
        }

        return () => {
            setInputGame({
                name: "",
                genre: "",
                release: "",
                platform: "",
                singlePlayer: false,
                multiplayer: false,
                image_url: ""
            })
            setCurrentIndex(-1)
        }

    }, [])

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setInputGame({...inputGame, [name]: value});
    }

    const handleCheck = (event) => {
        let value = event.target.checked;
        let name = event.target.name
        setInputGame({...inputGame, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let { name, genre, release, platform, singlePlayer, multiplayer, image_url } = inputGame;

        if(currentIndex === -1) {
            axios.post(`https://backendexample.sanbersy.com/api/data-game`, 
            { name, genre, release, platform, singlePlayer, multiplayer, image_url },
            {
                headers: {
                    "Authorization": "Bearer " + Cookies.get('token')
                  }
            }
            )
            .then((res) => {
                setFetchStatus(true);
                message.success('Game Added!');
                history.push('/game-list');
            })
        } else {
            axios.put(`https://backendexample.sanbersy.com/api/data-game/${currentIndex}`, 
            { name, genre, release, platform, singlePlayer, multiplayer, image_url },
            {
                headers: {
                    "Authorization": "Bearer " + Cookies.get('token')
                  }
            }
            )
            .then((res) => {
                message.success('Game Edited!');
                history.push("/game-list")
                setFetchStatus(true)
            })
        }
        
        setInputGame({
            name: "",
            genre: "",
            release: 0,
            platform: "",
            singlePlayer: false,
            multiplayer: false,
            image_url: ""
        });
        setCurrentIndex(-1);
    }


    return (
        <>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <Title style={{ textAlign: 'center' }}>Add Game</Title>
                    <div className="site-card-border-less-wrapper">
                      <form onSubmit={handleSubmit}> 
                        <label>Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={inputGame.name} 
                          placeholder="Name..." 
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey"}}
                        required/>
                        <label>Genre</label>
                        <input 
                          type="text" 
                          name="genre" 
                          value={inputGame.genre}
                          placeholder="Genre..." 
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey"}}
                        required/>
                        <label>Release Year</label>
                        <input 
                          type="text" 
                          name="release" 
                          value={inputGame.release}
                          placeholder="Release Year..." 
                          min="2000"
                          max="2021"
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey"}}
                        required/>
                        <label>Image URL</label>
                        <input 
                          type="text" 
                          name="image_url" 
                          value={inputGame.image_url}
                          placeholder="Image URL..." 
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey"}}
                        required/>
                        <label>Platform</label>
                        <input 
                          type="text" 
                          name="platform" 
                          value={inputGame.platform}
                          placeholder="Platfrom..." 
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey"}}
                        required/>
                        <label>Game Mode</label>
                        <Form.Item name="singlePlayer" onChange={handleChange} valuePropName={inputGame.singlePlayer} wrapperCol={{ offset:2, span: 16 }}>
                            <Checkbox>Single Player</Checkbox>
                        </Form.Item>
                        <Form.Item name="multiplayer" onChange={handleChange} valuePropName={inputGame.multiplayer} wrapperCol={{ offset:2, span: 16 }}>
                            <Checkbox>Multi Player</Checkbox>
                        </Form.Item>
                        <input type="submit" value="Add Game"/>
                      </form>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default GameForm