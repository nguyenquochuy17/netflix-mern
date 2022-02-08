//get movie
export const movieStart = () => ({
    type: "MOVIESTART"
})
export const movieSuccess = (movies) => ({
    type: "MOVIESUCCESS",
    payload: movies
})
export const movieFail = () => ({
    type: "MOVIEFAIL"
})

//delete movie
export const deleteMovieStart = () => ({
    type: "DELETEMOVIESTART"
})
export const deleteMovieSuccess = (movieId) => ({
    type: "DELETEMOVIESUCCESS",
    payload: movieId
})
export const deleteMovieFail = () => ({
    type: "DELETEMOVIEFAIL"
})

//create movie
export const createMovieStart = () => ({
    type: "CREATEMOVIESTART"
})
export const createMovieSuccess = (movie) => ({
    type: "CREATEMOVIESUCCESS",
    payload: movie
})
export const createMovieFail = () => ({
    type: "CREATEMOVIEFAIL"
})
//update
export const updateMovieStart = () => ({
    type: "UPDATEMOVIESTART"
})
export const updateMovieSuccess = (movie) => ({
    type: "UPDATEMOVIESUCCESS",
    payload: movie
})
export const updateMovieFail = () => ({
    type: "UPDATEMOVIEFAIL"
})