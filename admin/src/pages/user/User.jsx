import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish, RemoveFromQueue, SettingsInputSvideoRounded } from "@material-ui/icons";
import "./user.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../../firebase"
import axios from "axios";
import { updateUser } from "../../context/userContext/apiCalls";
import { userContext } from "../../context/userContext/userContext";

const User = () => {
    const [user, setUser] = useState({})
    const [profile, setProfile] = useState("")
    const [form, setForm] = useState({})

    const { userId } = useParams()
    const { dispatch } = useContext(userContext)

    const history = useNavigate()


    const handleOnChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const fileName = new Date().getTime() + "profilePic" + profile;
        const storageRef = ref(storage, `/items/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, profile)
        if (typeof profile == "string" || !profile) {
            updateUser({ ...user, ...form }, dispatch)
            history("/users")
        } else {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(ref(storage, `/items/${fileName}`)).then((url) => {
                        updateUser({ ...user, ...form, profilePic: url }, dispatch)
                        history("/users")
                    });
                }
            )
        }


    }


    useEffect(() => {
        const getOneUser = async () => {
            try {
                const res = await axios.get("/api/users/find/" + userId, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setUser(res.data)
                setProfile(res.data.profilePic)
            } catch (err) {
                console.log(err)
            }
        }
        getOneUser()
    }, [])

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src={user.profilePic || "https://source.unsplash.com/random/1000x1000?sig=1"} alt="" className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowUserName">{user.username}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.username}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.email}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input type="text"
                                    name="username"
                                    placeholder={user.username}
                                    className="userUpdateInput" onChange={handleOnChange} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="text"
                                    name="email"
                                    placeholder={user.email}
                                    className="userUpdateInput" onChange={handleOnChange} />
                            </div>

                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img src={typeof profile == "string"
                                    ? (profile == "" ? "https://source.unsplash.com/random/1000x1000?sig=1" : profile)
                                    : URL.createObjectURL(profile)
                                } alt="" className="userUpdateImg" />
                                <label htmlFor="file"><Publish className="userUpdateIcon" /></label>
                                <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setProfile(e.target.files[0])} />
                            </div>
                            <button className="userUpdateButton" onClick={handleUpdate}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default User;
