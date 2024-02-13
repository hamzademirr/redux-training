import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk('characters/getCharacters', async (page) => {
  const res = await axios(`https://rickandmortyapi.com/api/character?page=${page}`);
  return res.data;
})

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    items: [],
    page: 1,
    status: 'idle',
    error: null,
    hasNextPage: true,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // get characters
      .addCase(fetchCharacters.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [...state.items, ...action.payload.results];
        state.page += 1
        if(action.payload.results.length < 19){
          state.hasNextPage = false;
        }
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export default charactersSlice.reducer;
