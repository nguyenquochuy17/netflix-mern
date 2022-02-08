import {
    userFail, userStart, userSuccess, deleteUserFail, deleteUserStart, deleteUserSuccess
    , createUserFail, createUserStart, createUserSuccess, updateUserStart, updateUserSuccess, updateUserFail
} from "./userAction"
import axios from "axios"

export const getUser = async (dispatch) => {
    try {
        dispatch(userStart())
        const res = await axios.get("/api/users", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(userSuccess(res.data))
    } catch (err) {
        dispatch(userFail())
    }
}

export const deleteUser = async (id, dispatch) => {
    try {
        dispatch(deleteUserStart())
        const res = await axios.delete("/api/users/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(deleteUserSuccess(id))
    } catch (err) {
        dispatch(deleteUserFail())
    }
}

export const createUser = async (user, dispatch) => {
    try {
        dispatch(createUserStart())
        const res = await axios.post("/api/auth/register", user);
        dispatch(createUserSuccess(res.data))
    } catch (err) {
        console.log(err)
        dispatch(createUserFail())
    }
}



export const updateUser = async (user, dispatch) => {
    try {
        dispatch(updateUserStart())
        const res = await axios.put("/api/users/" + user._id, user, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(updateUserSuccess(res.data))

    } catch (err) {
        console.log(err)
        dispatch(updateUserFail())
    }
}