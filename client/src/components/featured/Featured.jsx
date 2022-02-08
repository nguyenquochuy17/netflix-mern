import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "./featured.scss"


const Featured = ({ type, setGenre }) => {
    const [content, setContent] = useState({})
    const handleChangeGenre = (e) => {
        setGenre(e.target.value)
    }
    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axios.get(`/api/movies/random?type=${type}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setContent(res.data[0])
            } catch (error) {
                console.log(error)
            }
        }
        getRandomContent()
    }, [type])

    return (
        <div className="featured">

            {type && (
                <div className="category">
                    <span>
                        {type === "movie" ? "Movies" : "Series"}
                    </span>
                    <select name="genre" id="genre" onChange={handleChangeGenre}>
                        <option value="">General</option>
                        <option value="action">Action</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>

                    </select>
                </div>
            )}
            <img
                src={content?.img}
                alt=""
            />
            <div className="info">
                <img src={content?.imgTitle}
                    alt=""
                />
                <span className="desc">
                    {content?.desc}
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured
