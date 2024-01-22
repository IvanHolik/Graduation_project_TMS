import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getArticles, IArticle} from "../api/articleServise";
import { getPubishedParam, paramsToString } from "../helperFunctions";
import { getOffset } from "../store/offsetSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";

export const ArticleList: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<IArticle[]>()
  const [limit, setLimit] = useState<number>(12)

  const offset = useAppSelector((state: RootState) => state.params.offset)
  const [articlesCount, setArticlesCount] = useState<number>(0)

  const [searchParams, setSearchParams] = useSearchParams();

  const searchInputText = useAppSelector((state: RootState) => state.searchInput.value);
  const darkTheme = useAppSelector((state: RootState) => state.theme.value);
  
  const [sortBy, setSortBy] = useState<string>('search')
  const [publishedAt, setPublishedAt] = useState<string>('day');
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const dispatch = useAppDispatch()

  const totalPages = useMemo(() => {
    return Math.ceil(articlesCount / limit) || 1;
  }, [articlesCount, limit])
  const currentPage = useMemo(() => {
    return Math.ceil(offset / limit + 1);
  }, [offset, limit])

  const dates = useRef(getPubishedParam(publishedAt));
  dates.current = getPubishedParam(publishedAt);
  let btnClass = "btn py-4 px-8 border-inherit rounded-lg bg-[#1a605b] transition ease-in-out" + (!darkTheme && " bg-[#64b1b1]");
  let btnActive = "btn py-4 px-8 border-inherit rounded-lg bg-[#223030] transition ease-in-out" + (!darkTheme && " bg-[#0ea889] bg-gradient-to-br from-[#3edabb]");


  const params = paramsToString({
    "limit": limit,
    "offset": offset,
    [sortBy]: searchInputText,
    "published_at_gte": dates.current
  })
  // console.log(params)
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
   setSearchParams({"limit": limit,
    "offset": offset,
    [sortBy]: searchInputText,
    "published_at_gte": dates.current}as any)
    // console.log(dates.current)
  }, [limit, offset, searchInputText, publishedAt, sortBy])


  return (
    <div className={darkTheme ?  "text-white bg-[url('./cosmo7.jpg')] bg-no-repeat bg-cover" : "text-black bg-[#b6f0f0]"}>
      <div className="container">
      <div className="flex gap-x-4 mb-9 pt-[72px]">
        <h1 className='text-5xl bold font-bold'>Article List</h1>
        {loading && <div
          className="inline-block h-8 w-8 animate-spin self-center rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>}
      </div>
      <div className="flex justify-between gap-x-5 mb-[64px]">
        <div onClick={(e: any) => {
         if(e.target.id) {
          setPublishedAt(e.target.id)
          dispatch(getOffset(0))
         }
        }}
          className="flex gap-x-4">
          <button id="day" className={publishedAt === "day" ? btnActive  : btnClass}>Day</button>
          <button id="week" className={publishedAt === "week" ? btnActive : btnClass}>Week</button>
          <button id="mounth" className={publishedAt === "mounth" ? btnActive : btnClass}>Month</button>
          <button id="year" className={publishedAt === "year" ? btnActive : btnClass}>Year</button>
        </div>
        <div className="relative w-full lg:max-w-sm">
          <select onChange={(e) => {
            setSortBy(e.target.value)
            dispatch(getOffset(0))
          }}
            className={"w-full p-2.5 bg-[#1a605b] border rounded-md outline-none appearance-none cursor-pointer focus:border-indigo-600" + (darkTheme && " text-white") + (!darkTheme && " text-black bg-[#64b1b1]")}>
            <option className={"" + (!darkTheme && " text-black")} value="search">-</option>
            <option className={"" + (!darkTheme && " text-black")} value="title_contains">Title</option>
            <option className={"" + (!darkTheme && " text-black")} value="summary_contains">Summary</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 items-stretch gap-x-8 gap-y-10 max-w-[1120px] mb-[72px]">
        {articles ? articles.map((article: IArticle) => {
          const path = `/articles/:${article.id}`
          return <Link className="" to={path} key={article.id}>
            <div className={"flex flex-col bg-[#1a605b] border-inherit rounded-2xl " + (!darkTheme && "bg-[#64b1b1]")}>
              <div className='img-wrapper'>
                <img className="w-full h-full max-h-[208px] object-cover border-inherit rounded-t-2xl" src={article.image_url} alt="" />
              </div>
              <div className="p-8">
                <p className="mb-2">{article.published_at}</p>
                <p className="">{article.title}</p>
              </div>
            </div>
          </Link>
        }) : <p className="text-center">List empty</p>}
      </div>
      <div className="flex justify-between pb-[72px]">
        <div className="flex">
          <button onClick={() => {
            if (prevPage === null) {
            } else {
              getArticles(params).then(response => {
                setArticles(response.results)
                setPrevPage(response.previous)
                setNextPage(response.next)
                setArticlesCount(response.count)
                dispatch(getOffset(offset - 12))
              })
            }
          }} className={prevPage === null ? "btn bg-[#bec8c8] px-6 py-3 border-inherit rounded-lg text-white" : "btn bg-[#223030] px-6 py-3 border-inherit rounded-lg text-white transition-all duration-300 hover:bg-[#2d7171] active:bg-[#52f0f0]"}
            disabled={prevPage === null && true}>Prev</button>
        </div>
        <div>
          <p>Page: {currentPage} of {totalPages}</p>
        </div>
        <div className="flex">
          <button onClick={() => {
            if (nextPage === null) {
            } else {
              getArticles(params).then(response => {
                setArticles(response.results)
                setPrevPage(response.previous)
                setNextPage(response.next)
                setArticlesCount(response.count)
                dispatch(getOffset(offset + 12))
              })
            }
          }}
            className={ 
              nextPage === null ?
               "btn bg-[#bec8c8] px-6 py-3 border-inherit rounded-lg text-white" :
                "btn bg-[#223030] px-6 py-3 border-inherit rounded-lg text-white transition-all duration-300 hover:bg-[#2d7171] active:bg-[#52f0f0]"
              }
            disabled={nextPage === null && true}>Next</button>
        </div>
      </div>
    </div>
    </div>
    
  );
}