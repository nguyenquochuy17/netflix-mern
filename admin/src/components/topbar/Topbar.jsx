import React from 'react';
import "./topbar.css"
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthAction';
import { Link } from 'react-router-dom';
const Topbar = () => {
    const { dispatch } = useContext(AuthContext)
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className='logo'>QuocHuy</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                    <div>
                        <div className="profile">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFeyrKf-1RdqqHhFE8TeHI9wLYZz7lLX3aojs2bcg5AeaOFrnAYkRd0ic59gAwmToWxg8&usqp=CAU"
                                alt="" className="topAvatar" />
                            <div className="containerProfile">
                                <Link to="/login" className="link">
                                    <div className='logout' onClick={() => dispatch(logout())}>Logout</div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Topbar;
