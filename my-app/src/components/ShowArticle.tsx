import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, IArticle } from "../api/articleServise";
import { RootState, useAppSelector } from "../store/store";

export const ShowArticle: React.FC = () => {
    const [article, setArticle] = useState<IArticle>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>();

    const darkTheme = useAppSelector((state: RootState) => state.theme.value);
    const { id } = useParams();

    useEffect(() => {
        const f = async () => {
            setLoading(true)
            try {
                const responceArticle = await getArticle(+id!.slice(1));
                setArticle(responceArticle);
                setError(null);
                console.log(responceArticle)
            } catch (e: unknown) {
                setError(e as Error);
            } finally {
                setLoading(false)
            }
        }
        f();

    }, [])

    return (
        <div className={darkTheme ? "text-white bg-[url('./cosmo6.jpg')] bg-no-repeat bg-cover" : "text-black bg-[#b6f0f0]"}>
            <div className="container">
                <div className="flex mb-8 pt-[60px]">
                    <Link className=" flex gap-x-2 hover:text-amber-500 transition ease-in-out" to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill={darkTheme ? "white" : "black"} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        <span>
                            Home
                        </span>
                    </Link>
                    <p>/ Post {id?.slice(1)}</p>
                </div>
                <div className="pb-12">
                    <h1 className="text-[46px] mb-12">{article?.title}</h1>
                    <div className="flex gap-x-5">
                        <div className="img-wrapper mb-12">
                            <img className="w-full h-full object-cover border-inherit rounded-2xl" src={article?.image_url} alt="" />
                        </div>
                        <div>
                            <p className="">Publicaton date: {article?.published_at}</p>
                            <p className="mb-12">Update date: {article?.updated_at}</p>

                            <p className="mb-10 italic">
                                {article?.summary}
                            </p>
                            <div className="mb-10">
                                <p>Source: {article?.news_site}</p>
                                <p>Read more: <a className={"transition ease-in-out" + (darkTheme ? " text-amber-200 hover:text-amber-500" : " text-purple-700 hover:text-purple-900")} href={article?.url}>{article?.url}</a></p>
                            </div>
                        </div>
                    </div>
                    <ul className="flex gap-x-5">
                        <li className="border-2 border-[#223030] p-2 hover:bg-[#0c3181] active:animate-ping transition ease-in-out  cursor-pointer">
                            <a href="#">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#313037" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </a>
                        </li>
                        <li className="border-2 border-[#223030] p-2 hover:bg-[#00a7e4] active:animate-ping transition ease-in-out cursor-pointer">
                            <a href="#">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="#313037" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </a>
                        </li>
                        <li className="border-2 border-[#223030] p-2 hover:bg-[#223030] active:animate-ping transition ease-in-out cursor-pointer">
                            <a href="#">
                                <svg fill="#ffffff" height="24" width="24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" stroke="#313037"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path className="cls-1" d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"></path> </g></svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}