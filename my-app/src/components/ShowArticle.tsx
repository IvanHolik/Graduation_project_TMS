import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, IArticle } from "../api/getArticles";

export const ShowArticle: React.FC = () => {
    const [article, setArticle] = useState<IArticle>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>();
    const { id } = useParams();
    // console.log(id)
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
        <div className="container">
            <div className="flex text-white mb-8">
                <Link to="/">Home</Link>
                <p>/ {id?.slice(1)}</p>
            </div>
            <div className="text-white mb-12">
                <h1 className="text-[46px] mb-12">{article?.title}</h1>
                <p className="">Publicaton date: {article?.published_at}</p>
                <p className="mb-12">Update date: {article?.updated_at}</p>
                <div className="img-wrapper mb-12">
                    <img className="w-full h-full object-cover border-inherit rounded-2xl" src={article?.image_url} alt="" />
                </div>
                <p className="mb-10">
                    {article?.summary}
                </p>
                <p>Source: {article?.news_site}</p>
                <p>Read more: <a className="text-amber-200 hover:text-amber-500" href={article?.url}>{article?.url}</a></p>
            </div>
        </div>
    )
}