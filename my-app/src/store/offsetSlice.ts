import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export const offsetSlice = createSlice({
    name: 'offset',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: {
        value: 0,
    },
    reducers: {
        getOffset: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
            // console.log(action.payload);
        }
    }
  })

  export const {getOffset} = offsetSlice.actions;
  export default offsetSlice.reducer;