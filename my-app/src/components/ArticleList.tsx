import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, getArticles, IArticle, paramsToString } from "../api/getArticles";
import { getPubishedParam } from "../helperFunctions";
import { getOffset } from "../store/offsetSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";

export const ArticleList: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<IArticle[]>()
  const [limit, setLimit] = useState<number>(12)
  // const [offset, setOffset] = useState<number>(0)
  const offset = useAppSelector((state: RootState) => state.offset.value)
  const [articlesCount, setArticlesCount] = useState<number>(0)
  const searchInputText = useAppSelector((state: RootState) => state.searchInput.value);
  const [sortBy, setSortBy] = useState<string>('search')
  const [publishedAt, setPublishedAt] = useState<string>('day');
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  // const [date, setDate] = useState<string>('2024-01-14');
  // const [activeBtn, setActiveBtn] = useState('')

  const dispatch = useAppDispatch()

  const totalPages = useMemo(() => {
    return Math.ceil(articlesCount / limit) || 1;
  }, [articlesCount, limit])
  const currentPage = useMemo(() => {
    return Math.ceil(offset / limit + 1);
  }, [offset, limit])

  const dates = useRef(getPubishedParam(publishedAt));
  dates.current = getPubishedParam(publishedAt);
  let btnClass = "btn py-4 px-8 border-inherit rounded-lg bg-[#1a605b]";
  let btnActive = "btn py-4 px-8 border-inherit rounded-lg bg-[#223030]";


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
    // console.log(dates.current)
  }, [limit, offset, searchInputText, publishedAt, sortBy])


  return (
    <div className="container text-white">
      <div className="flex gap-x-4 mb-9">
        <h1 className='text-5xl bold font-bold'>Article List</h1>
        {loading && <div
          className="inline-block h-8 w-8 animate-spin self-center rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>}
      </div>
      {/* {loading && <p>Loading...</p>} */}
      <div className="flex justify-between mb-[64px]">
        <div onClick={(e: any) => {
         if(e.target.id) {
          setPublishedAt(e.target.id)
          dispatch(getOffset(0))
         }
        }}
          className="flex gap-x-4">
          <button id="day" className={publishedAt === "day" ? btnActive : btnClass}>Day</button>
          <button id="week" className={publishedAt === "week" ? btnActive : btnClass}>Week</button>
          <button id="mounth" className={publishedAt === "mounth" ? btnActive : btnClass}>Month</button>
          <button id="year" className={publishedAt === "year" ? btnActive : btnClass}>Year</button>
        </div>
        <div className="relative w-full lg:max-w-sm">
          <select onChange={(e) => {
            setSortBy(e.target.value)
            dispatch(getOffset(0))
          }}
            className="w-full p-2.5 text-white bg-[#1a605b] border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
            <option value="search">-</option>
            <option value="title_contains">Title</option>
            <option value="summary_contains">Summary</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-8 gap-y-10 max-w-[1120px] mb-[72px]">
        {/* {loading && <p>Loading...</p>} */}
        {articles && articles.map((article: IArticle) => {
          const path = `/articles/:${article.id}`
          return <Link to={path}>
            <div className="flex flex-col bg-[#1a605b] border-inherit rounded-2xl" key={article.id}>
              <div className='img-wrapper'>
                <img className="w-full h-full max-h-[208px] object-cover border-inherit rounded-t-2xl" src={article.image_url} alt="" />
              </div>
              <div className="p-8">
                <p className="mb-2">{article.published_at}</p>
                <p>{article.title}</p>
              </div>
            </div>
          </Link>
        })}
      </div>
      <div className="flex justify-between mb-[72px]">
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
              // crossArticlesPage(prevPage).then(response => {
              //   setArticles(response.results)
              //   setPrevPage(response.previous)
              //   setNextPage(response.next)
              //   setArticlesCount(response.count)
              // })
            }
          }} className={prevPage === null ? "btn bg-[#bec8c8] px-6 py-3 border-inherit rounded-lg" : "btn bg-[#223030] px-6 py-3 border-inherit rounded-lg"}
            disabled={prevPage === null && true}>Prev</button>
        </div>
        <div>
          <p>Page: {currentPage} of {totalPages}</p>
          {/* <p>Pages:{totalPages}</p> */}
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

              // crossArticlesPage(nextPage).then(response => {
              //   setArticles(response.results)
              //   setPrevPage(response.previous)
              //   setNextPage(response.next)
              //   setArticlesCount(response.count)
              // })
            }
          }}
            className={nextPage === null ? "btn bg-[#bec8c8] px-6 py-3 border-inherit rounded-lg" : "btn bg-[#223030] px-6 py-3 border-inherit rounded-lg"}
            disabled={nextPage === null && true}>Next</button>
        </div>
      </div>
    </div>
  );
}