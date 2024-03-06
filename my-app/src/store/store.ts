import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import searchInputReducer from "./inputSlice"
import themeReducer from "./themeSlice"
import paramReducer from "./paramSlice";
import articleReducer from "./articleSlice"
import paramTrueReducer from "./ParSlice"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const store = configureStore({
    reducer: {
        articles: articleReducer,
        searchInput: searchInputReducer,
        theme: themeReducer,
        params: paramReducer,
        trueParams: paramTrueReducer,
    }
})

