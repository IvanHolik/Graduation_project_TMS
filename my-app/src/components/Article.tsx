import { Link } from "react-router-dom"
import { IArticle } from "../api/articleServise";
import { RootState, useAppSelector } from "../store/store";


export const Article: React.FC<{article: IArticle}> = ({article}) => {
    const darkTheme = useAppSelector((state: RootState) => state.theme.value);
    const path = `/articles/:${article.id}`;
    return (
        <div className="self-stretch">
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
    )
}