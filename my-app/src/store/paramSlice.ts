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
    sortBy: localStorage.getItem('sortBy')  || 'search',
    published_at_gte: localStorage.getItem('published_at_gte') || 'week',
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

export const { setOffset, setPublishedAt, setSortBy } = paramSlice.actions;
export default paramSlice.reducer;

// setPublishedAt: (state, action: PayloadAction<string>) => {
//     state.published_at_gte = action.payload;
// },
// setParams: (state, action: PayloadAction<IParams>) => {
//     state = action.payload;
// },
// setSummaryContains: (state, action: PayloadAction<string>) => {
//     state.summary_contains = action.payload;
// },
// setTitleContains: (state, action: PayloadAction<string>) => {
//     state.title_contains = action.payload;
// },
// setSearch: (state, action: PayloadAction<string>) => {
//     state.search = action.payload;
// },

// const initState: IParams = {
//     limit: 12,
//     offset: 0,
//     search: '',
//     published_at_gte: 'week',
// }