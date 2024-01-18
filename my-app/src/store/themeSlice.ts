import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export const themeSlice = createSlice({
    name: 'dark theme',
    // `createSlice` will infer the state type from the `initialState` argument
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