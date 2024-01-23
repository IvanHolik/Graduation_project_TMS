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
    published_at_gte: 'week',
}

export const paramSlice = createSlice({
    name: 'search params',
    initialState: initState,
    reducers: {

        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        setPublishedAt: (state, action: PayloadAction<string>) => {
            state.published_at_gte = action.payload;
        },
    }
})

export const { setOffset, setSortBy, setPublishedAt } = paramSlice.actions;
export default paramSlice.reducer;