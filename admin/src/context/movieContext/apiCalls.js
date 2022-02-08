import axios from "axios"
import {
    deleteMovieFail, deleteMovieStart, deleteMovieSuccess, movieFail, movieStart, movieSuccess
    , createMovieStart, createMovieFail, createMovieSuccess, updateMovieFail, updateMovieStart, updateMovieSuccess
} from "./movieAction"


export const getMovie = async (dispatch) => {
    try {
        dispatch(movieStart())
        const res = await axios.get("/api/movies", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(movieSuccess(res.data))
    } catch (err) {
        dispatch(movieFail())
    }
}

export const deleteMovie = async (id, dispatch) => {
    try {
        dispatch(deleteMovieStart())
        const res = await axios.delete("/api/movies/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(deleteMovieSuccess(id))
    } catch (err) {
        dispatch(deleteMovieFail())
    }
}


export const createMovie = async (movie, dispatch) => {
    try {
        dispatch(createMovieStart())
        const res = await axios.post("/api/movies/", movie, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createMovieSuccess(res.data))
    } catch (err) {
        console.log(err)
        dispatch(createMovieFail())
    }
}


export const updateMovie = async (movie, dispatch) => {
    try {
        dispatch(updateMovieStart())
        const res = await axios.put("/api/movies/" + movie._id, movie, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });

        dispatch(updateMovieSuccess(res.data))
    } catch (err) {
        console.log(err)
        dispatch(updateMovieFail())
    }
}