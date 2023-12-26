// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import apiUsers from "../api/usersService";

// export const getUserData = createAsyncThunk("users/getUserData", async (value) => {
//     const { data } = await apiUsers.getAll(value);
//     return data.response
// });

// export const getById = createAsyncThunk("users/getById", async (value) => {
//     const { data } = await apiUsers.getById(value);
//     return data.response
// });



// const initialState = {
//     users: [],
//     currentPage: 0,
//     totalPages: 0,
//     totalRecords: 0,
//     user: {}
// };

// const updateUsers = (state, { payload }) => {
//     state.users = payload.data;
//     state.totalPages = payload.totalPages;
//     state.totalRecords = payload.totalRecords;
//     state.currentPage = payload.currentPage
// }

// const selectedUser = (state, { payload }) => {
//     state.user = payload;
// }

// export const usersSlice = createSlice({
//     name: "users",
//     initialState,
//     reducers: {
//         getUsers: (state, { payload }) => {
//             state.users = payload
//         },
//         deleteUser: (state, { payload }) => {
//             state.users = state.users.filter(user => user._id !== payload)
//         },
//         changeStatus: (state, { payload }) => {
//             const { id, status } = payload;
//             const userIndex = state.users.findIndex((user) => user._id === id);

//             if (userIndex !== -1) {
//                 const updatedUsers = [...state.users];
//                 updatedUsers[userIndex] = {
//                     ...updatedUsers[userIndex],
//                     status,
//                 };

//                 return {
//                     ...state,
//                     users: updatedUsers,
//                 };
//             }

//             return state;
//         },

//         editUser: (state, action) => {
//             console.log(state, action)
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(getUserData.fulfilled, updateUsers)
//             .addCase(getById.fulfilled, selectedUser);
//     },
// });

// export const { getUsers, deleteUser, editUser, changeStatus } = usersSlice.actions;

// export default usersSlice.reducer;
