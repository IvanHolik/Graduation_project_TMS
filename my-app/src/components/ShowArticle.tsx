import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, IArticle } from "../api/articleServise";
import { RootState, useAppSelector } from "../store/store";
import { Facebook } from "./svg/Facebook";
import { Options } from "./svg/Options";
import { Twitter } from "./svg/Twitter";


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
            } catch (e: unknown) {
                setError(e as Error);
            } finally {
                setLoading(false)
            }
        }
        f();

    }, [id])

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
                            <Facebook/>
                            </a>
                        </li>
                        <li className="border-2 border-[#223030] p-2 hover:bg-[#00a7e4] active:animate-ping transition ease-in-out cursor-pointer">
                            <a href="#">
                                <Twitter/>
                            </a>
                        </li>
                        <li className="border-2 border-[#223030] p-2 hover:bg-[#223030] active:animate-ping transition ease-in-out cursor-pointer">
                            <a href="#">
                                <Options/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}