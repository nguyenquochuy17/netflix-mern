//get movie
export const userStart = () => ({
    type: "USERSTART"
})
export const userSuccess = (users) => ({
    type: "USERSUCCESS",
    payload: users
})
export const userFail = () => ({
    type: "USERFAIL"
})

//delete user
export const deleteUserStart = () => ({
    type: "DELETEUSERSTART"
})
export const deleteUserSuccess = (userId) => ({
    type: "DELETEUSERSUCCESS",
    payload: userId
})
export const deleteUserFail = () => ({
    type: "DELETEUSERFAIL"
})

//create user
export const createUserStart = () => ({
    type: "CREATEUSERSTART"
})
export const createUserSuccess = (user) => ({
    type: "CREATEUSERSUCCESS",
    payload: user
})
export const createUserFail = () => ({
    type: "CREATEUSERFAIL"
})
//update
export const updateUserStart = () => ({
    type: "UPDATEUSERSTART"
})
export const updateUserSuccess = (user) => ({
    type: "UPDATEUSERSUCCESS",
    payload: user
})
export const updateUserFail = () => ({
    type: "UPDATEUSERFAIL"
})