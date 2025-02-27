import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'User',
  bio: 'This is my bio.',
  profilePicture: 'https://via.placeholder.com/150',
  likedMemes: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.name = action.payload.name;
      state.bio = action.payload.bio;
      state.profilePicture = action.payload.profilePicture;
    },
    likeMeme: (state, action) => {
      state.likedMemes.push(action.payload);
    },
  },
});

export const { updateProfile, likeMeme } = userSlice.actions;
export default userSlice.reducer;