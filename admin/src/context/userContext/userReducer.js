export const userReducer = (state, action) => {
    switch (action.type) {
        case "USERSTART":
            return {
                users: [],
                isFetching: true,
                error: false
            }
        case "USERSUCCESS":
            return {
                users: action.payload,
                isFetching: false,
                error: false
            }
        case "USERFAIL":
            return {
                users: [],
                isFetching: false,
                error: true
            }
        case "DELETEUSERSTART":
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case "DELETEUSERSUCCESS":
            return {
                users: state.users.filter((user) => user._id != action.payload),
                isFetching: false,
                error: false
            }
        case "DELETEUSERFAIL":
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case "CREATEUSERSTART":
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case "CREATEUSERSUCCESS":
            return {
                users: [...state.users, action.payload],
                isFetching: false,
                error: false
            }
        case "CREATEUSERFAIL":
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case "UPDATEUSERSTART":
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case "UPDATEUSERSUCCESS":
            return {
                users: state.users.map(m => m._id == action.payload._id ? action.payload : m),
                isFetching: false,
                error: false
            }
        case "UPDATEUSERFAIL":
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return { ...state }
    }
}