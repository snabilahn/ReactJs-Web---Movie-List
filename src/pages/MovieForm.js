import React, { useContext, useEffect } from 'react';
import { Layout, Typography, message } from 'antd';
import '../assets/style/style.css'
import axios from "axios"
import { useHistory } from "react-router-dom"
import { MovieContext } from '../context/MovieContext';
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"

const MovieForm = () => {
    const { Content } = Layout;
    const { Title } = Typography;
    let history = useHistory()

    const { slug } = useParams()
    console.log(slug)

    const { 
        inputMovie, setInputMovie, currentIndex, setCurrentIndex, functions, setFetchStatus
    } = useContext(MovieContext);

    const { functionUpdateMovie } = functions;

    useEffect(() => {
        if (slug !== undefined) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${slug}`)
                .then((res) => {
                    let data = res.data
                    setInputMovie({
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
                })
        }

        return () => {
            setInputMovie({
                title: "",
                genre: "",
                year: 0,
                duration: 0,
                rating: 0,
                review: "",
                image_url: "",
                description: ""
            })
            setCurrentIndex(-1)
        }

    }, [])


    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setInputMovie({...inputMovie, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let {title, genre, year, duration, rating, review, image_url, description } = inputMovie;
        
        if(currentIndex === -1) {
            
            axios.post(`https://backendexample.sanbersy.com/api/data-movie`, 
            { title, genre, year, duration, rating, review, image_url, description },
            { 
              headers: {
                "Authorization": "Bearer " + Cookies.get('token')
              }
            }
            )
            .then((res) => {
                console.log(inputMovie)
                setFetchStatus(true);
                message.success('Movie Added!');
                history.push('/movie-list');
            }).catch((err) => {
                alert(err)
            })
        } else {
            axios.put(`https://backendexample.sanbersy.com/api/data-movie/${currentIndex}`, 
            { title, genre, year, duration, rating, review, image_url, description },
            {
              headers: {
                "Authorization": "Bearer " + Cookies.get('token')
              }
            }
            )
            .then((res) => {
              message.success('Movie Edited!');
              history.push("/movie-list")
              setFetchStatus(true)
            })
        }
        
        setInputMovie({
            title: "",
            genre: "",
            year: 0,
            duration: 0,
            rating: 0,
            review: "",
            image_url: "",
            description: ""
        });
        setCurrentIndex(-1);
    }


    return (
        <>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <Title style={{ textAlign: 'center' }}>Add Movie</Title>
                    <div className="site-card-border-less-wrapper">
                      <form onSubmit={handleSubmit}> 
                        <label>Title</label>
                        <input 
                          type="text" 
                          name="title" 
                          value={inputMovie.title} 
                          placeholder="Title..." 
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey"}}
                        required/>
                        <label>Genre</label>
                        <input 
                          type="text" 
                          name="genre" 
                          value={inputMovie.genre}
                          placeholder="Genre..." 
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey"}}
                        required/>
                        <label>Year</label>
                        <input 
                          type="number" 
                          name="year" 
                          value={inputMovie.year}
                          placeholder="Year..." 
                          min="1980"
                          max="2021"
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey"}}
                        required/>
                        <label>Image URL</label>
                        <input 
                          type="text" 
                          name="image_url" 
                          value={inputMovie.image_url}
                          placeholder="Image URL..." 
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey"}}
                        required/>
                        <label>Duration</label>
                        <input 
                          type="number" 
                          name="duration" 
                          value={inputMovie.duration}
                          placeholder="Duration..." 
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey"}}
                        required/>
                        <label>Rating</label>
                        <input 
                          type="number" 
                          name="rating" 
                          value={inputMovie.rating}
                          placeholder="Rating..." 
                          min="0"
                          max="10"
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey"}}
                        required/>
                        <label>Review</label>
                        <textarea 
                          name="review" 
                          value={inputMovie.review}
                          placeholder="Review..."
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey", width: "100%"}}
                        required/>
                        <label>Description</label>
                        <textarea 
                          name="description" 
                          value={inputMovie.description}
                          placeholder="Description..."
                          onChange={handleChange}
                          style={{marginBottom: "2%", border: "1px solid grey", width: "100%"}}
                        required/>
                        <input type="submit" value="Add Movie"/>
                      </form>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default MovieForm