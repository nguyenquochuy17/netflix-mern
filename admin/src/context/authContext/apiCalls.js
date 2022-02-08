import axios from "axios"
import { loginStart, loginSuccess, loginFail } from "./AuthAction"
export const login = async (user, dispatch) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("/api/auth/login", user)
        res.data.isAdmin ? dispatch(loginSuccess(res.data)) : dispatch(loginSuccess(null))
    } catch (err) {
        dispatch(loginFail())
    }
}