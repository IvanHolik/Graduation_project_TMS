import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export const searchInputSlice = createSlice({
    name: 'search input',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: {
        value: '',
    },
    reducers: {
        getInputSearch: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
            // console.log(action.payload);
        }
    }
  })

  export const {getInputSearch} = searchInputSlice.actions;
  export default searchInputSlice.reducer;