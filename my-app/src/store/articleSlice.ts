import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IArticle, paginatedArticleList } from "../api/articleServise";

interface ArticleSlice {
    results: IArticle[],
    article: IArticle | null,
    count: null | number,
    loading: boolean,
    error: string | null
  }

  const initialState: ArticleSlice = {
    results: [],
    article: null,
    count: null,
    loading: false,
    error: null,
  }

  export const fetchArticles = createAsyncThunk<paginatedArticleList, string, { rejectValue: string }>(
    'posts/fetchPosts',
    
    async function (params, { rejectWithValue }) {

        const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?${params}`);
        if (!response.ok) {
          return rejectWithValue('Server error!');
        }
        const data = await response.json();
        return data;
      }
  )
export const articleSlice = createSlice({
    name: 'article list',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
          .addCase(fetchArticles.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchArticles.fulfilled, (state, action) => {
            state.results = action.payload.results;
            state.count = action.payload.count;
            state.loading = false;
            state.error = null;
          })
        }
})

// export const { getArticle } = articleSlice.actions;
export default articleSlice.reducer;