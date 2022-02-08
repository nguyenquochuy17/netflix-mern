import "./navbar.scss"
import { useState } from "react"
import { Search, Notifications, ArrowDropDown } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../authContext/AuthContext"
import { logout } from "../../authContext/AuthActions"
const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const { user, dispatch } = useContext(AuthContext)
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => window.onscroll = null
    }
    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <Link to="/" className="link">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span className="navbarlink">Series</span>
                    </Link>
                    <Link to="/movies" className="link navbarlink">
                        <span className="navbarlink">Movie</span>
                    </Link>
                </div>
                <div className="right">
                    <Search className="icon" />
                    <span>KID</span>
                    <Notifications className="icon" />
                    <img src={user.profilePic || "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"}
                        alt="" />
                    <div className="profile">
                        <div>
                            <ArrowDropDown className="icon" />
                        </div>
                        <div className="options">
                            <span>Settings</span>
                            <span onClick={() => dispatch(logout())}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
