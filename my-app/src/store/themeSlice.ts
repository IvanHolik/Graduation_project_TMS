import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export const themeSlice = createSlice({
    name: 'dark theme',
    initialState: {
        value: false,
    },
    reducers: {
        changeTheme: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
            // console.log(action.payload);
        }
    }
  })

  export const {changeTheme} = themeSlice.actions;
  export default themeSlice.reducer;