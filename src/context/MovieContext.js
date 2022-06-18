import React, { createContext, useState } from "react"
import axios from "axios"

export const MovieContext = createContext()

export const MovieProvider = props => {
    const [dataMovie, setDataMovie] = useState([]);
    const [dataGame, setDataGame] = useState([]);

    const [inputMovie, setInputMovie] = useState({
        title: "",
        genre: "",
        year: 0,
        duration: 0,
        rating: 0,
        review: "",
        image_url: "",
        description: ""
    });

    const [inputGame, setInputGame] = useState({
        name: "",
        genre: "",
        release: "",
        platform: "",
        singlePlayer: false,
        multiplayer: false,
        image_url: ""
    });

    let [currentIndex, setCurrentIndex] = useState(-1);
    let [fetchStatus, setFetchStatus] = useState(true);
    let [isLoading, setIsLoading] = useState(true);

    const fetchDataMovie = async () => {
        let result = await axios.get('https://backendexample.sanbersy.com/api/data-movie');
        let data = result.data;

        setDataMovie(data.map((e) => {
            return {
                id: e.id,
                title: e.title,
                genre: e.genre,
                year: e.year,
                duration: e.duration,
                rating: e.rating,
                review: e.review,
                image_url: e.image_url,
                description: e.description
            }
        }))
    }

    const fetchDataGame = async () => {
        let result = await axios.get('https://backendexample.sanbersy.com/api/data-game');
        let data = result.data;

        setDataGame(data.map((e) => {
            return {
                id: e.id,
                name: e.name,
                genre: e.genre,
                release: e.release,
                platform: e.platform,
                singlePlayer: e.singlePlayer,
                multiplayer: e.multiplayer,
                image_url: e.image_url
        }
        }))
    }

    const functionUpdateGame = (params) => {
        let { name, genre, release, platform, singlePlayer, multiplayer, image_url } = inputMovie;
            axios.put(`https://backendexample.sanbersy.com/api/data-game/${currentIndex}`, { name, genre, release, platform, singlePlayer, multiplayer, image_url })
            .then((res) => {
                let updatedData = dataGame.find(el=> el.id === currentIndex)
                updatedData = {
                    name, genre, release, platform, singlePlayer, multiplayer, image_url
                }
                setFetchStatus(true)
            })
    }


    const functions = {
        fetchDataMovie,
        fetchDataGame,
        functionUpdateGame
    }

    return(
        <MovieContext.Provider value={{
            dataMovie,
            setDataMovie,
            dataGame,
            setDataGame,
            inputMovie,
            setInputMovie,
            inputGame,
            setInputGame,
            currentIndex,
            setCurrentIndex,
            fetchStatus,
            setFetchStatus,
            isLoading,
            setIsLoading,
            functions
        }}>
            {props.children}
        </MovieContext.Provider>
    )



}