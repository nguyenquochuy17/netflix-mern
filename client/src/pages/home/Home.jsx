import React from 'react'
import "./home.scss"
import NavBar from "../../components/navbar/NavBar"
import Featured from "../../components/featured/Featured"
import List from "../../components/list/List"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { useRef } from 'react'
const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState("")
    const ref = useRef(false)

    useEffect(() => {
        if (type == "movies" || type == "series") {
            ref.current = false
        }
        if (!ref.current) {
            const getRandomLists = async () => {
                try {
                    const res = await axios.get(`api/lists${type ? "?type=" + type : ""}${(genre && type) ? "&genre=" + genre : ""}`,
                        {
                            headers: {
                                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                            }
                        }
                    )
                    setLists(res.data)
                } catch (error) {
                    console.log(error);
                }
            }
            getRandomLists()
        }
        if (!type) {
            setGenre("")
            ref.current = true
        }
    }, [type, genre])

    return (

        <div className='home'>
            <NavBar />
            <Featured type={type} setGenre={setGenre} />
            {lists.map((list) => {
                return (
                    <List key={list._id} list={list} />
                )
            })}
        </div>

    )
}

export default Home
