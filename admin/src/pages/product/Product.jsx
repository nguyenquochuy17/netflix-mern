import { Link, useNavigate, useParams } from "react-router-dom";
import "./product.css";
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../../firebase"
import { Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { CircularProgress } from "@material-ui/core";
import { movieContext } from "../../context/movieContext/movieContext";
import { useRef } from "react";


export default function Product() {
    const { id } = useParams()
    const [form, setForm] = useState(null)
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(false)
    const history = useNavigate()
    const reference = useRef(false)

    const handleOnChange = (e) => {
        const value = e.target.value;
        setForm({ ...form, [e.target.name]: value })
    }
    const { isFetching, dispatch } = useContext(movieContext)


    useEffect(() => {
        if (!reference.current) {
            //mount
            reference.current = true
        } else {
            //did update
            if (!isFetching) {
                setLoading(false)
                history("/movies")
            }
        }
    }, [isFetching])



    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const items = [
            { file: img, label: "img" },
            { file: imgTitle, label: "imgTitle" },
            { file: imgSm, label: "imgSm" },
            { file: trailer, label: "trailer" },
            { file: video, label: "video" },
        ]
        const allUrlImage = {};
        Promise.all(
            items.map((item) => {
                return new Promise((resolve, reject) => {
                    if (item.file != null && item.file.name != undefined) {
                        const fileName = new Date().getTime() + item.label + item.file.name;
                        const storageRef = ref(storage, `/items/${fileName}`)
                        const uploadTask = uploadBytesResumable(storageRef, item.file)
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
                                    allUrlImage[item.label] = url
                                    resolve("")
                                });
                            }
                        )
                    } else {
                        resolve("")
                    }
                }
                )
            })
        ).then(() => {
            updateMovie({ ...form, ...allUrlImage }, dispatch);
        })

    };




    useEffect(() => {
        const getOneMovie = async () => {
            try {
                const res = await axios.get("/api/movies/find/" + id, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setMovie(res.data)
                setForm(res.data)
                setImg({ preview: res.data.img })
                setImgTitle({ preview: res.data.imgTitle })
                setImgSm({ preview: res.data.imgSm })
            } catch (err) {
                console.log(err)
            }
        }
        getOneMovie()
    }, [])
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie</h1>
                <Link to="/newMovie">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={movie.img} alt="" className="productInfoImg" />
                        <span className="productName">{movie.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Id:</span>
                            <span className="productInfoValue">{movie._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Genre:</span>
                            <span className="productInfoValue">{movie.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Year</span>
                            <span className="productInfoValue">{movie.year}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Limit</span>
                            <span className="productInfoValue">{movie.limit}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie Title</label>
                        <input type="text" name="title" placeholder={movie.title} onChange={handleOnChange} />
                        <label>Year</label>
                        <input type="text" name="year" placeholder={movie.year} onChange={handleOnChange} />
                        <label>Genre</label>
                        <input type="text" name="genre" placeholder={movie.genre} onChange={handleOnChange} />
                        <label>Is Series?</label>
                        <select name="isSeries" id="isSeries" value={movie.isSeries} onChange={handleOnChange} >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                        <label>Desc</label>
                        <input type="text" name="desc" placeholder={movie.desc} onChange={handleOnChange} />
                        <label>Limit</label>
                        <input type="text" name="limit" placeholder={movie.limit} onChange={handleOnChange} />
                        <label>Trailer</label>
                        <input type="file" placeholder={movie.trailer} onChange={(e) => setTrailer(e.target.files[0])} />
                        <label>Video</label>
                        <input type="file" placeholder={movie.video} onChange={(e) => setVideo(e.target.files[0])} />
                    </div>

                    <div className="productFormRight">
                        <div>
                            <div style={{ marginBottom: "10px", color: "gray" }}>
                                <div style={{ marginLeft: "5px" }}>Title Image</div>
                                <div className="productUpload">
                                    <img src={imgTitle?.preview} alt="" className="productUploadImg" />
                                    <input
                                        type="file"
                                        id="imgTitle"
                                        onChange={(e) => {
                                            const file = e.target.files[0]
                                            file.preview = URL.createObjectURL(file)
                                            setImgTitle(file)
                                        }}
                                        style={{ display: "none" }}
                                    />
                                    <label htmlFor="imgTitle">
                                        <Publish />
                                    </label>
                                </div>
                            </div>
                            <div style={{ marginBottom: "10px", color: "gray" }}>
                                <div style={{ marginLeft: "25px" }}>Image</div>
                                <div className="productUpload">
                                    <img src={imgSm?.preview} alt="" className="productUploadImg" />
                                    <input
                                        type="file"
                                        id="imgSm"
                                        onChange={(e) => {
                                            const file = e.target.files[0]
                                            file.preview = URL.createObjectURL(file)
                                            setImgSm(file)
                                        }}
                                        style={{ display: "none" }}
                                    />
                                    <label for="imgSm">
                                        <Publish />
                                    </label>
                                </div>
                            </div>
                            <div style={{ marginBottom: "10px", color: "gray" }}>
                                <div style={{ marginLeft: "18px" }}>Thumbnail</div>
                                <div className="productUpload">
                                    <img src={img?.preview} alt="" className="productUploadImg" />
                                    <input
                                        type="file"
                                        id="img"
                                        onChange={(e) => {
                                            const file = e.target.files[0]
                                            file.preview = URL.createObjectURL(file)
                                            setImg(file)
                                        }}
                                        style={{ display: "none" }}
                                    />
                                    <label for="img">
                                        <Publish />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className="productButton" onClick={handleSubmit}>Update</button>
                        {loading && <CircularProgress color="secondary" />}
                    </div>
                </form>
            </div >
        </div >
    );
}