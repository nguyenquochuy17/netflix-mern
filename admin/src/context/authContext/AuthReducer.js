export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGINSTART":
            return {
                user: null,
                isFetching: true,
                error: false
            }
        case "LOGINSUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }
        case "LOGINFAIL":
            return {
                user: null,
                isFetching: false,
                error: true,
            }
        case "LOGOUTSTART":
            return {
                user: null,
                isFetching: null,
                error: null,
            }
        default:
            return { ...state }

    }
}

