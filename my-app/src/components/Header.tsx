import { Link } from "react-router-dom"
import { setOffset } from "../store/paramSlice"
import { useAppDispatch } from "../store/store"
import { Blogologo } from "./svg/Blogologo"

export const Header: React.FC = () => {

    const dispatch = useAppDispatch()

    return (
        <header className="py-0 px-4 bg-custom-color font-main">
            <div className="container flex justify-between gap-3">
            <Link onClick={() => dispatch(setOffset(0))} to="/" className="self-center">
                <Blogologo />
            </Link>
            <div className="flex gap-x-4">
                <Link to="/articles/create" className="nav-link">Create article</Link>
                <Link to="/login" className="nav-link">Log In</Link>
            </div>
            </div>
        </header>
    )
}

