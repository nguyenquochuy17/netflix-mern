import React from 'react';
import "./sidebar.css"
import { LineStyle, Timeline, TrendingUp, Person, MonetizationOn, Storefront, Assessment, Mail, Feedback, Message, LocalMall, ReportProblem, PlayCircleOutline, AddToQueue, QueuePlayNext } from '@material-ui/icons';
import { Link } from "react-router-dom"
import { useState } from 'react';
import { List } from '@material-ui/core';
const Sidebar = () => {

    const [position, setPosition] = useState(0)
    const handleClick = (position) => {
        setPosition(position)
    }
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className='link' onClick={() => handleClick(0)}>
                            <li className={`sidebarListItem ${position == 0 && "active"}`} >
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon" />
                            Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className='link' onClick={() => handleClick(1)}>
                            <li className={`sidebarListItem ${position == 1 && "active"}`} >
                                <Person className="sidebarIcon" />
                                User
                            </li>
                        </Link>
                        <Link to="/movies" className='link' onClick={() => handleClick(2)}>
                            <li className={`sidebarListItem ${position == 2 && "active"}`}>
                                <PlayCircleOutline className="sidebarIcon" />
                                Movies
                            </li>
                        </Link>
                        <Link to="/newMovie" className='link' onClick={() => handleClick(3)}>
                            <li className={`sidebarListItem ${position == 3 && "active"}`}>
                                <AddToQueue className="sidebarIcon" />
                                Add Movie
                            </li>
                        </Link>
                        <Link to="/lists" className='link' onClick={() => handleClick(4)}>
                            <li className={`sidebarListItem ${position == 4 && "active"}`}>
                                <PlayCircleOutline className="sidebarIcon" />
                                Lists
                            </li>
                        </Link>

                        <Link to="/newList" className='link' onClick={() => handleClick(5)}>
                            <li className={`sidebarListItem ${position == 5 && "active"}`}>
                                <QueuePlayNext className="sidebarIcon" />
                                Add List
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notification</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem ">
                            <Mail className="sidebarIcon" />
                            Mail
                        </li>
                        <li className="sidebarListItem">
                            <Feedback className="sidebarIcon" />
                            Feedback
                        </li>
                        <li className="sidebarListItem">
                            <Message className="sidebarIcon" />
                            Messages
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem ">
                            <LocalMall className="sidebarIcon" />
                            Manage
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <ReportProblem className="sidebarIcon" />
                            Reports
                        </li>
                    </ul>
                </div>
            </div >
        </div>
    )
};

export default Sidebar;
