import { createContext, useReducer } from "react";
import { userReducer } from "./userReducer";

const initialState = {
    users: [],
    isFetching: false,
    error: false,
}

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, initialState);
    return (
        <userContext.Provider value={{ ...user, dispatch }}>
            {children}
        </userContext.Provider>
    )
}