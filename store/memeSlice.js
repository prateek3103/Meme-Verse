import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  memes: [],
  loading: false,
  error: null,
};

const memeSlice = createSlice({
  name: 'memes',
  initialState,
  reducers: {
    setMemes: (state, action) => {
      state.memes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMemes, setLoading, setError } = memeSlice.actions;
export default memeSlice.reducer;