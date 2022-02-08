//log in
export const loginStart = () => ({
    type: "LOGINSTART"
})
export const loginSuccess = (user) => ({
    type: "LOGINSUCCESS",
    payload: user
})
export const loginFail = () => ({
    type: "LOGINFAIL"
})

//log out
export const logout = () => ({
    type: "LOGOUTSTART"
})
