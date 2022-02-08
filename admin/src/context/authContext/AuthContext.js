import { createContext, useEffect, useReducer } from "react"
import { authReducer } from "./AuthReducer"

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])
    return (
        <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
