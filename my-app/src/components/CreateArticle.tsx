import { useRef, useState } from "react"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createArticle } from "../api/articleServise";
import { RootState, useAppSelector } from "../store/store";

export const CreateArticle: React.FC = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [file, setFile] = useState<any>();
    const [selectedImage, setSelectedImage] = useState<any>();
    const [error, setError] = useState<any>(null);
    const inputFile = useRef<any>(null);

    const darkTheme = useAppSelector((state: RootState) => state.theme.value);

    const onChange = (e: any) => {
        setSelectedImage(null)
        if (e.target.files.length !== 0) {
            setFile(e.target.files[0]);
            const image = URL.createObjectURL(e.target.files[0])
            setSelectedImage(image)
        }
    };

    const {
        register,
        formState: {
            errors,
        },
        reset,
        handleSubmit
    } = useForm({
        mode: "onBlur"
    })

    const onSubmit = (e: any) => {
        setError(null)
        const article: any = {
            title,
            summary,
            image: file!,
        }
        try{
            createArticle(article)
            setTitle('')
            setSummary('')
            setFile(null)
            setSelectedImage(null)
            inputFile.current.value = null;
        }catch(e) {
            setError(createArticle(article))
        }
        finally{
            console.log(error)
        }
    }

    return (
        <div className={darkTheme ? "text-white bg-[url('./cosmo7.jpg')] bg-no-repeat bg-cover pt-[60px] pb-[152px]" : "text-black bg-[#b6f0f0] pt-[60px] pb-[152px]"}>
            <div className="container">
                <Link className="flex gap-x-2 mb-[32px] hover:text-amber-500 transition ease-in-out" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill={darkTheme ? "white" : "black"} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <span>
                        Back to home
                    </span>
                </Link>
                <h2 className="mb-[72px] font-bold text-3xl">Create new article</h2>
                {error && <p>Server error. Please try to resend the form</p> }
                <form className={"mx-auto p-10 max-w-[724px] border-none rounded-2xl" + (darkTheme ? " bg-[#223030]" : " bg-[#64b1b1]")}>
                    <div className="mb-4 form-check">
                        <label htmlFor="title" className="form-check-label">Title</label>
                        <input
                            {...register("title", {
                                required: true
                            })}
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={"form-title-input" + (darkTheme ? " bg-slate-600" : " bg-white")}
                            placeholder="Title..." />
                        {errors?.title && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div className="mb-4 form-check">

                        <label htmlFor="message" className="form-check-label">Summary</label>
                        <textarea
                            {...register("summary", {
                                required: true
                            })}
                            id="message"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            rows={4}
                            className={"form-title-input mb-3" + (darkTheme ? " bg-slate-600" : " bg-white")}
                            placeholder="Leave a summary..."></textarea>
                        {errors?.summary && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div className="relative mb-[20px] form-check flex flex-col">
                        <input
                            className="opacity-0 hidden absolute"
                            type="file"
                            onChange={onChange}
                            id="image"
                            ref={inputFile}
                        />
                        <label className="bg-orange-600 w-1/5 cursor-pointer text-center py-2 px-5 rounded-md transition ease-in-out hover:bg-orange-400" htmlFor="image">Choose file</label>
                    </div>
                    {selectedImage && <div className="mb-3">
                        <img className="w-[150px] h-[150px] mb-2" src={selectedImage} alt="" />
                        <button onClick={() => {
                            setSelectedImage(null)
                            if (inputFile.current) {
                                inputFile.current.value = "";
                                inputFile.current.type = "file";
                            }
                        }
                        } className="delete-photo-btn">Remove image</button>
                    </div>
                    }
                    <button onClick={handleSubmit(onSubmit)} className="form-submit-btn" type="button">Submit</button>
                </form>
            </div>
        </div>
    )
}
