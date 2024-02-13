import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacter = createAsyncThunk('character/getCharacter', async (index) => {
  const res = await axios(`https://rickandmortyapi.com/api/character/${index}`);
  return res.data;
})

export const characterSlice = createSlice({
  name: 'character',
  initialState: {
    item: [],
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // get character
      .addCase(fetchCharacter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(fetchCharacter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  }
})

export default characterSlice.reducer;
