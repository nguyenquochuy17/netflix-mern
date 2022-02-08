import { Visibility } from "@material-ui/icons";
import "./widgetSm.css"
import { useState, useEffect } from "react"
import axios from "axios";

const WidgetSm = () => {
    const [newUser, setNewUser] = useState([])
    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axios.get("/api/users?new=true", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setNewUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getNewUsers()
    }, [])

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {newUser.map((user) => (
                    <li className="widgetSmlistItem">
                        <img src={user.profilePic || "https://source.unsplash.com/random/1000x1000?sig=1"} alt="" className="widgetSmImg" />
                        <div className="widgetSmUser">
                            <span className="widgetSmUserName">{user.username}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                )
                )}
            </ul>
        </div>
    )
};

export default WidgetSm;
