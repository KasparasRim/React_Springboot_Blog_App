import {createSlice} from '@reduxjs/toolkit';


const initialState = null

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn(userState, { payload: loggedInUser }) {
            console.log(loggedInUser)
            return loggedInUser
        },
        userLoggedOut() {
            return initialState
        }
    }
})

export default userSlice.reducer

export const { userLoggedIn, userLoggedOut } = userSlice.actions