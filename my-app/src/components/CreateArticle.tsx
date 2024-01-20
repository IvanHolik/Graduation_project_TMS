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
        // e.preventDefault();
        const article: any = {
            title,
            summary,
            image: file!,
        }
        // console.log(article)
        createArticle(article)
        setTitle('')
        setSummary('')
        setFile(null)
        setSelectedImage(null)
        inputFile.current.value = null;
    }

    return (
        <div className={darkTheme ?  "text-white bg-[url('./cosmo6.jpg')] bg-no-repeat bg-cover pt-[60px] pb-[152px]" : "text-black bg-[#b6f0f0] pt-[60px] pb-[152px]"}>
            <div className="container">
                <Link className="mb-8 hover:text-amber-500 transition ease-in-out" to="/">Back to home</Link>
                <h2 className="mb-[72px] font-bold text-3xl">Create new article</h2>
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
                            className={"w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1" + (darkTheme ? " bg-slate-600" : " bg-white")}
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
                            className={"w-full px-4 py-2 mb-3 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1" + (darkTheme ? " bg-slate-600" : " bg-white") }
                            placeholder="Leave a summary..."></textarea>
                        {errors?.summary && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div className="mb-[48px] form-check flex flex-col">
                        <label htmlFor="image" className="form mb-1 mr-2 w-2/5" >Image</label>
                        <input
                            // {...register("image", {
                            //     required: true
                            // })}
                            className="cursor-pointer w-2/5"
                            type="file"
                            onChange={onChange}
                            id="image"
                            ref={inputFile}
                        // value={image}
                        />
                        {/* {errors?.image && <p className="text-red-500">This field is required</p>} */}
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
                        } className="btn bg-red-500 hover:bg-red-800 mb-8 py-2 w-1/5 border-none rounded-md transition ease-in-out">Remove image</button>
                    </div>
                    }
                    <button onClick={handleSubmit(onSubmit)} className="btn bg-[#1a605b] hover:bg-[#019191] py-4 w-full border-none rounded-md transition ease-in-out" type="button">Submit</button>
                </form>
            </div>
        </div>

    )
}
