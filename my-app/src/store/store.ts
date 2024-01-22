import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import searchInputReducer from "./inputSlice"
// import offsetReducer from "./offsetSlice"
import themeReducer from "./themeSlice"
import paramReducer from "./paramSlice";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const store = configureStore({
    reducer: {
        searchInput: searchInputReducer,
        // offset: offsetReducer,
        theme: themeReducer,
        params: paramReducer,
    }
})

