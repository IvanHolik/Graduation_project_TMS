import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export const searchInputSlice = createSlice({
    name: 'search input',
    initialState: {
        value: localStorage.getItem('inputValue') || '',
    },
    reducers: {
        getInputSearch: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export const { getInputSearch } = searchInputSlice.actions;
export default searchInputSlice.reducer;