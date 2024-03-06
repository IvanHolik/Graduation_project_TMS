import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IArticle } from "../api/articleServise";
import { getPubishedParam, paramsToString, saveToLS } from "../helperFunctions";
import { setOffset, setSortBy } from "../store/paramSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { fetchArticles } from "../store/articleSlice";
import { setPublishedAt } from "../store/ParSlice";
import { getInputSearch } from "../store/inputSlice";
import { Cross } from "./svg/Cross";
import { Search } from "./svg/Search";
import { Article } from "./Article";

export const ArticleList2: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const storeOffset = useAppSelector((state: RootState) => state.params.offset)
  const storeLimit = useAppSelector((state: RootState) => state.params.limit)
  const storeSortBy = useAppSelector((state: RootState) => state.params.sortBy)
  const storePublishedAt = useAppSelector((state: RootState) => state.params.published_at_gte);
  const searchInputText = useAppSelector((state: RootState) => state.searchInput.value);
  const darkTheme = useAppSelector((state: RootState) => state.theme.value);
  const storeArticles = useAppSelector((state: RootState) => state.articles.results);
  const storeArticlesCount = useAppSelector((state: RootState) => state.articles.count);
  const loading = useAppSelector((state: RootState) => state.articles.loading);
  
  const lSInputValue = localStorage.getItem('inputValue');
  const [inputValue, setInputValue] = useState(lSInputValue || '')
  const dispatch = useAppDispatch()

  const sendInputSearch = () => {
    dispatch(setOffset(0))
    dispatch(getInputSearch(inputValue))
  }

  const totalPages = useMemo(() => {
    return Math.ceil(storeArticlesCount! / storeLimit) || 1;
  }, [storeArticlesCount, storeLimit])
  const currentPage = useMemo(() => {
    let result = Math.ceil(storeOffset / storeLimit + 1);
    return result;
  }, [storeOffset, storeLimit])

  const dates = useRef(getPubishedParam(storePublishedAt));
  dates.current = getPubishedParam(storePublishedAt);
  let btnClass = "btn py-4 px-8 border-inherit rounded-lg transition-all duration-300 bg-[#1a605b] hover:bg-[#2d7171] active:bg-[#52f0f0]" + (!darkTheme && " bg-[#64b1b1]");
  let btnActive = "btn py-4 px-8 border-inherit rounded-lg transition-all duration-300" + (!darkTheme ? " bg-[#0ea889] bg-gradient-to-br from-[#223030]" : " bg-[#3edabb] bg-gradient-to-br from-[#a935ec]");

  const params = paramsToString({
    "limit": storeLimit,
    "offset": storeOffset,
    [storeSortBy]: searchInputText,
    "published_at_gte": dates.current
  })

  useEffect(() => {
    const f = async () => {
      try {
        dispatch(fetchArticles(params))
      } catch (e) {
        console.log('error')
      }
    }
    f();
    setSearchParams(params)
  }, [storeLimit, storeOffset, searchInputText, storePublishedAt, storeSortBy, params])

  return (
    <div className={darkTheme ? "text-white bg-[url('./cosmo7.jpg')] bg-no-repeat bg-cover" : "text-black bg-[#b6f0f0]"}>
      <div className="container">
        <div className="flex gap-x-4 mb-9 pt-[72px]">
          <h1 className='text-5xl bold font-bold'>Article List</h1>
          {loading && <div
            className="loading-spinner"
            role="status">
          </div>
          }
        </div>
        <div className="flex justify-between gap-x-5 mb-[20px]">
          <div onClick={(e: any) => {
            if (e.target.id) {
              dispatch(setPublishedAt(e.target.id))
              localStorage.setItem('published_at_gte', e.target.id)
              dispatch(setOffset(0))
              localStorage.setItem('offset', JSON.stringify(storeOffset))
            }
          }}
            className="flex gap-x-4">
            <button id="day" className={storePublishedAt === "day" ? btnActive : btnClass}>Day</button>
            <button id="week" className={storePublishedAt === "week" ? btnActive : btnClass}>Week</button>
            <button id="mounth" className={storePublishedAt === "mounth" ? btnActive : btnClass}>Month</button>
            <button id="year" className={storePublishedAt === "year" ? btnActive : btnClass}>Year</button>
          </div>

          <div className="flex relative w-full lg:max-w-sm">
            <p>Filter by:</p>
            <select
              defaultValue={localStorage.getItem('sortBy') || 'search'}
              onChange={(e) => {
                dispatch(setSortBy(e.target.value))
                localStorage.setItem('sortBy', e.target.value)
                dispatch(setOffset(0))
                localStorage.setItem('offset', JSON.stringify(storeOffset))
              }}
              className={"w-full p-2.5 bg-[#1a605b] border rounded-md outline-none appearance-none cursor-pointer focus:border-indigo-600 hover:bg-teal-600" + (darkTheme ? " text-white" : " text-black bg-[#64b1b1]")}>
              <option className={"" + (!darkTheme && " text-black")} value="search">Title & summary</option>
              <option className={"" + (!darkTheme && " text-black")} value="title_contains">Title</option>
              <option className={"" + (!darkTheme && " text-black")} value="summary_contains">Summary</option>
            </select>
          </div>
        </div>
        <div className="flex items-center flex-grow mb-[30px]">
          <div className="relative flex border-2 border-gray-600 rounded">
            <input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                localStorage.setItem('inputValue', e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  dispatch(setOffset(0))
                  return sendInputSearch();
                }
              }}
              id="search_input"
              type="text"
              className={"px-4 py-2 w-80 " + (darkTheme && "bg-custom-color border-gray-600 rounded text-white")}
              placeholder="Search..."
              autoComplete="off"
            />
            {inputValue && <button onClick={() => {
              dispatch(getInputSearch(''))
              setInputValue('')
              localStorage.removeItem('inputValue');
              dispatch(setOffset(0));
            }}
              className="absolute inset-y-0 right-[55px] flex items-center px-3 text-gray-600"
            >
              <Cross />
            </button>}
            <label htmlFor="search_input" className="flex items-center justify-center px-4 border-l border-gray-600 rounded">
              <button className="cursor-pointer" onClick={sendInputSearch}>
                <Search />
              </button>
            </label>
          </div>
        </div>
        {searchInputText && <p className="mb-[25px] text-3xl">Search results: <span className="italic">"{searchInputText}"</span></p>}
        {storeArticles === null || storeArticles.length === 0 && <div className="py-[150px]">
          <p className={"text-4xl text-center" + (darkTheme ? " text-white" : " text-emerald-900")}>List empty</p>
        </div>}
        <div className="grid grid-cols-3 gap-8 max-w-[1120px] mb-[72px]">
          {storeArticles && storeArticles.map((article: IArticle) => {
            return <Article key={article.id} article={article} />
          })}
        </div>
        <Stack alignItems="center" paddingBottom="10px" spacing={2}>
          {storeArticles !== null && storeArticles.length !== 0 &&
            <Pagination
              style={{ backgroundColor: "white", borderRadius: "10px", padding: "5px 0" }}
              count={totalPages}
              page={currentPage}
              showFirstButton
              showLastButton
              onChange={(_, num) => {
                dispatch(fetchArticles(params));
                if (num > currentPage) {
                  dispatch(setOffset(storeOffset + (12 * (num - currentPage))))
                } else {
                  dispatch(setOffset(storeOffset - (12 * (currentPage - num))))
                }
                localStorage.setItem('offset', JSON.stringify(storeOffset))
              }
              }
              color="primary"
              size="large" />
          }
        </Stack>
      </div>
    </div>
  );
}