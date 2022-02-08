
import axios from "axios";
import { updateMovieFail, updateMovieStart, updateMovieSuccess } from "../movieContext/movieAction";
import {
    createListFailure,
    createListStart,
    createListSuccess,
    deleteListFailure,
    deleteListStart,
    deleteListSuccess,
    getListsFailure,
    getListsStart,
    getListsSuccess,
} from "./ListActions";

export const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try {
        const res = await axios.get("/api/lists", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getListsSuccess(res.data));
    } catch (err) {
        dispatch(getListsFailure());
    }
};

//create
export const createList = async (list, dispatch) => {
    dispatch(createListStart());
    try {
        const res = await axios.post("/api/lists", list, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createListSuccess(res.data));
    } catch (err) {
        dispatch(createListFailure());
    }
};

//delete
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete("/api/lists/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteListSuccess(id));
    } catch (err) {
        dispatch(deleteListFailure());
    }
};

export const updateList = async (list, dispatch) => {
    try {
        dispatch(updateMovieStart())
        const res = await axios.put("/api/lists/" + list._id, list, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(updateMovieSuccess(res.data))
    } catch (err) {
        dispatch(updateMovieFail())
    }
}