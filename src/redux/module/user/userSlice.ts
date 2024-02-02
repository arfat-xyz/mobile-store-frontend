import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUserDataInterface {
  name: string | null;
  email: string | null;
  token: string | null;
  image: string | null;
}
const initialState: IUserDataInterface = {
  name: null,
  email: null,
  token: null,
  image: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserDataInterface>) => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      state.email = action.payload?.email || user?.email || null;
      state.name = action.payload?.name || user?.name || null;
      state.token = action.payload?.token || user?.token || null;
      state.image = action.payload?.image || user?.image || null;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
