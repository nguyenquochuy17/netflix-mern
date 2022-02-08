import { createContext, useReducer } from "react";
import { movieReducer } from "./movieReducer";

const initialState = {
    movies: [],
    isFetching: false,
    error: false,
}

export const movieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movie, dispatch] = useReducer(movieReducer, initialState);
    return (
        <movieContext.Provider value={{ ...movie, dispatch }}>
            {children}
        </movieContext.Provider>
    )
}