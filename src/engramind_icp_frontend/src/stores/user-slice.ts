import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  principal: "",
  nickname: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    settingPrincipal: (state, action) => {
      state.principal = action.payload;
    },
    settingNickname: (state, action) => {
      state.nickname = action.payload;
    },
    resetState: (state) => {
      state.principal = "";
      state.nickname = "";
    },
  },
});

const { actions, reducer } = userSlice;
export const { settingPrincipal, settingNickname, resetState } = actions;
export default reducer;
