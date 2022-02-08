import { ArrowBackOutlined } from '@material-ui/icons'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'


import "./watch.scss"

const Watch = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState({})
    useEffect(() => {
        const getMovieWatch = async () => {
            try {
                const res = await axios.get(`/api/movies/find/${id}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setMovie(res.data)

            } catch (error) {
                console.log(error)
            }
        }
        getMovieWatch();
    }, [])
    return (
        <div className='watch'>
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video className="video" autoPlay progress controls
                src={movie.trailer}
            ></video>
        </div >
    )
}

export default Watch
