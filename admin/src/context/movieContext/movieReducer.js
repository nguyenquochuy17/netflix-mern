export const movieReducer = (state, action) => {
    switch (action.type) {
        case "MOVIESTART":
            return {
                movies: [],
                isFetching: true,
                error: false
            }
        case "MOVIESUCCESS":
            return {
                movies: action.payload,
                isFetching: false,
                error: false
            }
        case "MOVIEFAIL":
            return {
                movies: [],
                isFetching: false,
                error: true
            }
        case "DELETEMOVIESTART":
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case "DELETEMOVIESUCCESS":
            return {
                movies: state.movies.filter((movie) => movie._id != action.payload),
                isFetching: false,
                error: false
            }
        case "DELETEMOVIEFAIL":
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case "CREATEMOVIESTART":
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case "CREATEMOVIESUCCESS":
            return {
                movies: [...state.movies, action.payload],
                isFetching: false,
                error: false
            }
        case "CREATEMOVIEFAIL":
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case "UPDATEMOVIESTART":
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case "UPDATEMOVIESUCCESS":
            return {
                movies: state.movies.map(m => m._id == action.payload._id ? action.payload : m),
                isFetching: false,
                error: false
            }
        case "UPDATEMOVIEFAIL":
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return { ...state }
    }
}