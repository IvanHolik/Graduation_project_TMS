import { useEffect, useRef, useState } from "react";
import { getArticles, IArticle, paramsToString } from "../api/getArticles";
import { getPubishedParam } from "../helperFunctions";
import { RootState, useAppSelector } from "../store/store";

export const ArticleList: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<IArticle[]>()
  const [limit, setLimit] = useState(12)
  const [offset, setOffset] = useState(0)
  const searchInputText = useAppSelector((state: RootState) => state.searchInput.value);
  const [sortBy, setSortBy] = useState<string>('search')
  const [publishedAt, setPublishedAt] = useState<string>('day');
  // const [date, setDate] = useState<string>('2024-01-14');
  // const [activeBtn, setActiveBtn] = useState('')
  const dates = useRef(getPubishedParam(publishedAt));
  dates.current = getPubishedParam(publishedAt);
  let btnClass = "btn py-4 px-8 border-inherit rounded-lg bg-[#1a605b]";

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
          articles => setArticles(articles.results)
        );
      } catch (e) {
        console.log('error')
      }
      finally{
        setLoading(false)
      }
    }
    f();
    // console.log(dates.current)
  }, [limit, offset,searchInputText,publishedAt])
  return (
    <div className="container text-white">
      <h1 className='text-5xl bold font-bold mb-9'>Article List</h1>
      {loading && <p>Loading...</p>}
      <div className="flex justify-between mb-[64px]">
        <div onClick={(e: any) => {
          setPublishedAt(e.target.id)    
        }}
          className="flex gap-x-4">
          <button id="day" className={btnClass}>Day</button>
          <button id="week" className={btnClass}>Week</button>
          <button id="mounth" className={btnClass}>Month</button>
          <button id="year" className={btnClass}>Year</button>
        </div>
        <div className="relative w-full lg:max-w-sm">
          <select onChange={(e) => setSortBy(e.target.value)} className="w-full p-2.5 text-white bg-[#1a605b] border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
            <option value="search">-</option>
            <option value="title_contains">Title</option>
            <option value="summary_contains">Summary</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-8 gap-y-10 max-w-[1120px] mb-[72px]">
      {loading && <p>Loading...</p>}
        {articles && articles.map((article: IArticle) => {
          return <div className="flex flex-col bg-[#1a605b] border-inherit rounded-2xl" key={article.id}>
            <div className='img-wrapper'>
              <img className="w-full h-full object-cover border-inherit rounded-t-2xl" src={article.image_url} alt="" />
            </div>
            <div className="p-8">
              <p className="mb-2">{article.published_at}</p>
              <p>{article.title}</p>
            </div>

          </div>
        })}
      </div>
      <div className="flex justify-between mb-[72px]">
        <div className="flex">
          <button className="btn bg-[#223030] px-6 py-3 border-inherit rounded-lg">Prev</button>
        </div>
        <div>
          <p>1 2 3</p>
        </div>
        <div className="flex">
          <button className="btn bg-[#223030] px-6 py-3 border-inherit rounded-lg">Next</button>
        </div>
      </div>
    </div>
  );
}