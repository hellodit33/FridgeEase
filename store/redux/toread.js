import { createSlice } from "@reduxjs/toolkit";

const toReadSlice = createSlice({
  name: "toread",
  initialState: {
    ids: [],
  },
  reducers: {
    addToRead: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeToRead: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

export const addToRead = toReadSlice.actions.addToRead;
export const removeToRead = toReadSlice.actions.removeToRead;

export default toReadSlice.reducer;
