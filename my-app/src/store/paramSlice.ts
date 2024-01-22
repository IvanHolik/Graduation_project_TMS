import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IParams {
    limit: number,
    offset: number,
    sortBy: string,
    published_at_gte: string
}
const initState: IParams = {
    limit: 12,
    offset: 0,
    sortBy: 'search',
    published_at_gte: 'day',
}

export const paramSlice = createSlice({
    name: 'search params',
    initialState: initState,
    reducers: {
        setParamsSearch: (state, action: PayloadAction<IParams>) => {
            state.limit = action.payload.limit;
            state.offset = action.payload.offset;
            state.sortBy = action.payload.sortBy;
            state.published_at_gte = action.payload.published_at_gte;
            // state.value = action.payload;
            // console.log(action.payload);
        },
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
            // state.value = action.payload;
            // console.log(action.payload);
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
            // state.value = action.payload;
            // console.log(action.payload);
        },
        setPublishedAt: (state, action: PayloadAction<string>) => {
            state.published_at_gte = action.payload;
            // state.value = action.payload;
            // console.log(action.payload);
        },
    }
  })

  export const {setParamsSearch, setOffset, setSortBy, setPublishedAt} = paramSlice.actions;
  export default paramSlice.reducer;