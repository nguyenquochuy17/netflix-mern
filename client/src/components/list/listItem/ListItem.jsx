import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./listItem.scss"
const ListItems = ({ index, listItemId }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [item, setItem] = useState({})
    useEffect(() => {
        const getItem = async () => {
            try {
                const res = await axios.get(`/api/movies/find/${listItemId}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setItem(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getItem()
    }, [listItemId])
    return (
        <Link to={{ pathname: `/watch/${listItemId}` }} >
            <div className="wrapper1">
                <div className="listItem"
                    style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}

                >
                    <img src={item?.img}
                        alt="" />
                    {isHovered &&
                        <>
                            <video src={item?.trailer} autoPlay={true} loop type={"video / ogg"} />
                            <div className="itemInfo">
                                <div className="icons">
                                    <PlayArrow className="icon" />
                                    <Add className="icon" />
                                    <ThumbUpAltOutlined className="icon" />
                                    <ThumbDownOutlined className="icon" />
                                </div>
                                <div className="itemInfoTop">
                                    <span>{item?.duration}</span>
                                    <span className='limit'>+{item?.limit}</span>
                                    <span>{item?.year}</span>
                                </div>
                                <div className="desc">
                                    {item?.desc}
                                </div>
                                <div className="genre">{item?.type}</div>
                            </div>
                        </>
                    }
                </div >
            </div>
        </Link>

    )
}

export default ListItems
