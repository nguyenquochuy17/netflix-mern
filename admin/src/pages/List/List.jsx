import { Link, useNavigate } from "react-router-dom";
import "./list.css";
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { updateList } from "../../context/listContext/apiCalls";
import { movieContext } from "../../context/movieContext/movieContext";
import { CircularProgress } from "@material-ui/core";
export default function List() {
    const { listId } = useParams()
    const [list, setList] = useState({})
    const [form, setForm] = useState({})

    const { isFetching, dispatch } = useContext(ListContext)
    const history = useNavigate()

    const handleOnChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        updateList({ ...list, ...form }, dispatch)
        history("/lists")
    }


    useEffect(() => {
        const getOneList = async () => {
            try {
                const res = await axios.get("/api/lists/find/" + listId, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setList(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getOneList()
    }, [])
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">List</h1>
                <Link to="/newList">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <span className="productName">{list.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{list._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{list.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">type:</span>
                            <span className="productInfoValue">{list.type}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>List Title</label>
                        <input type="text" name="title" placeholder={list.title} onChange={handleOnChange} />
                        <label>Type</label>
                        <input type="text" name="type" placeholder={list.type} onChange={handleOnChange} />
                        <label>Genre</label>
                        <input type="text" name="genre" placeholder={list.genre} onChange={handleOnChange} />
                    </div>
                    <div className="productFormRight">
                        <button className="productButton" onClick={handleUpdate}>Update</button>
                        {isFetching && <CircularProgress />}
                    </div>
                </form>
            </div>
        </div>
    );
}