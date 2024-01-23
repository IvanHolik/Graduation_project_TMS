import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getArticles, IArticle } from "../api/articleServise";
import { getPubishedParam, paramsToString } from "../helperFunctions";
import { setOffset, setPublishedAt, setSortBy } from "../store/paramSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export const ArticleList2: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<IArticle[] | null>(null)
  const [articlesCount, setArticlesCount] = useState<number>(0)
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const storeOffset = useAppSelector((state: RootState) => state.params.offset)
  const storeLimit = useAppSelector((state: RootState) => state.params.limit)
  const storeSortBy = useAppSelector((state: RootState) => state.params.sortBy)
  const storePublishedAt = useAppSelector((state: RootState) => state.params.published_at_gte);
  const searchInputText = useAppSelector((state: RootState) => state.searchInput.value);
  const darkTheme = useAppSelector((state: RootState) => state.theme.value);

  const dispatch = useAppDispatch()

  const totalPages = useMemo(() => {
    return Math.ceil(articlesCount / storeLimit) || 1;
  }, [articlesCount, storeLimit])
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
      setLoading(true)
      try {
        const articles = await getArticles(params).then(
          articles => {
            setArticles(articles.results)
            setPrevPage(articles.previous)
            setNextPage(articles.next)
            setArticlesCount(articles.count)
          }
        );
      } catch (e) {
        console.log('error')
      }
      finally {
        setLoading(false)
      }
    }
    f();
    setSearchParams({
      "limit": storeLimit,
      "offset": storeOffset,
      [storeSortBy]: searchInputText,
      "published_at_gte": dates.current
    } as any)
  }, [storeLimit, storeOffset, searchInputText, storePublishedAt, storeSortBy])


  return (
    <div className={darkTheme ? "text-white bg-[url('./cosmo7.jpg')] bg-no-repeat bg-cover" : "text-black bg-[#b6f0f0]"}>
      <div className="container">
        <div className="flex gap-x-4 mb-9 pt-[72px]">
          <h1 className='text-5xl bold font-bold'>Article List</h1>
          {loading && <div
            className="loading-spinner"
            role="status">
          </div>}
        </div>
        <div className="flex justify-between gap-x-5 mb-[40px]">
          <div onClick={(e: any) => {
            if (e.target.id) {
              dispatch(setPublishedAt(e.target.id))
              dispatch(setOffset(0))
            }
          }}
            className="flex gap-x-4">
            <button id="day" className={storePublishedAt === "day" ? btnActive : btnClass}>Day</button>
            <button id="week" className={storePublishedAt === "week" ? btnActive : btnClass}>Week</button>
            <button id="mounth" className={storePublishedAt === "mounth" ? btnActive : btnClass}>Month</button>
            <button id="year" className={storePublishedAt === "year" ? btnActive : btnClass}>Year</button>
          </div>
          <div className="flex relative w-full lg:max-w-sm">
            <p>Sort by:</p>
            <select onChange={(e) => {
              dispatch(setSortBy(e.target.value))
              dispatch(setOffset(0))
            }}
              className={"w-full p-2.5 bg-[#1a605b] border rounded-md outline-none appearance-none cursor-pointer focus:border-indigo-600 hover:bg-teal-600" + (darkTheme ? " text-white" : " text-black bg-[#64b1b1]")}>
              <option className={"" + (!darkTheme && " text-black")} value="search">Title & summary</option>
              <option className={"" + (!darkTheme && " text-black")} value="title_contains">Title</option>
              <option className={"" + (!darkTheme && " text-black")} value="summary_contains">Summary</option>
            </select>
          </div>
        </div>
        {searchInputText && <p className="mb-[25px] text-3xl">Search results: <span className="italic">"{searchInputText}"</span></p>}
        {articles === null || articles.length === 0 && <div className="py-[150px]">
          <p className={"text-4xl text-center" + (darkTheme ? " text-white" : " text-emerald-900")}>List empty</p>
        </div>}
        <div className="grid grid-cols-3 gap-8 max-w-[1120px] mb-[72px]">
          {articles && articles.map((article: IArticle) => {
            const path = `/articles/:${article.id}`
            return <div className="self-stretch" key={article.id}>
              <Link to={path} className={"flex flex-col h-full bg-[#1a605b] border-inherit rounded-2xl " + (!darkTheme && "bg-[#64b1b1]")}>
                <div className='img-wrapper'>
                  <img className="w-full h-full max-h-[208px] object-cover border-inherit rounded-t-2xl" src={article.image_url} alt="" />
                </div>
                <div className="pt-4 p-8">
                  <p className="mb-2">{article.published_at}</p>
                  <p className="">{article.title}</p>
                </div>
              </Link>
            </div>
          })}
        </div>
        <Stack alignItems="center" paddingBottom="10px" spacing={2}>
          {articles !== null && articles.length !== 0 &&
            <Pagination
              style={{ backgroundColor: "white", borderRadius: "10px", padding: "5px 0" }}
              count={totalPages}
              page={currentPage}
              showFirstButton
              showLastButton
              onChange={(_, num) => {
                if (num > currentPage) {
                  getArticles(params).then(response => {
                    setArticles(response.results)
                    setArticlesCount(response.count)
                    dispatch(setOffset(storeOffset + (12 * (num - currentPage))))
                  })
                } else if (num < currentPage) {
                  getArticles(params).then(response => {
                    setArticles(response.results)
                    setArticlesCount(response.count)
                    dispatch(setOffset(storeOffset - (12 * (currentPage - num))))
                  })
                }
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