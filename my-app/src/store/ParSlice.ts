import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getPubishedParam } from "../helperFunctions";

interface IParams2 {
    limit: number,
    offset: number,
    search?: string,
    summary_contains?: string,
    title_contains?: string,
    published_at_gte: string
}

const initState: IParams2 = {
    limit: 12,
    offset: 0,
    search: '',
    published_at_gte: getPubishedParam('week'),
}

// const getPars = (): any  => {
//     if (localStorage.getItem("params") !== null) {
//         const par = (localStorage.getItem("params"));
//         console.log(par)
//         if(par !== null) {
//             return JSON.parse(par);
//         }
        
//     } else {
//         return initState;
//     }

// }

export const parSlice = createSlice({
    name: 'search params',
    initialState: initState,
    reducers: {

        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
        setPublishedAt: (state, action: PayloadAction<string>) => {
            state.published_at_gte = action.payload;
        },
        setParams: (state, action: PayloadAction<IParams2>) => {
            state = action.payload;
        },
        setSummaryContains: (state, action: PayloadAction<string>) => {
            state.summary_contains = action.payload;
        },
        setTitleContains: (state, action: PayloadAction<string>) => {
            state.title_contains = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },

    }
})

export const { setOffset, setPublishedAt, setParams, setSummaryContains, setTitleContains, setSearch } = parSlice.actions;
export default parSlice.reducer;