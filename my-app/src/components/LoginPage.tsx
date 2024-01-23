import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { ACCSESS_TOKEN } from "../constants/constants"
import { RootState, useAppDispatch, useAppSelector } from "../store/store"

export interface Creds {
    email: string,
    password: string
}

export const LoginPage: React.FC = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const darkTheme = useAppSelector((state: RootState) => state.theme.value);

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const togglePasswordVisible = (e: any) => {
        e.preventDefault()
        setPasswordVisible((prevState) => !prevState);
    }

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

    const onSubmit = (data: any) => {
        alert("Authorization was successful")
        reset()
        navigate("/")
        localStorage.setItem(ACCSESS_TOKEN, "lalala");
    }
    return (
        <div className={darkTheme ? "text-white bg-[url('./cosmo7.jpg')] bg-no-repeat bg-cover pt-[60px] pb-[152px]" : "text-black bg-[#b6f0f0] pt-[60px] pb-[152px]"}>
            <div className="container">
                <Link className="flex gap-x-2 mb-8 hover:text-amber-500 transition ease-in-out" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill={darkTheme ? "white" : "black"} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <span>Back to home</span></Link>
                <h2 className="mb-[72px] font-bold text-3xl">Sign In</h2>
                <form className={"mx-auto p-10 max-w-[724px] border-none rounded-2xl" + (darkTheme ? " bg-[#223030]" : " bg-[#64b1b1]")}>
                    <div className="mb-4 form-check">
                        <label htmlFor="email" className="form-check-label" >Email</label>
                        <input
                            {...register("email", {
                                required: true
                            })}
                            id="email"
                            className={"w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1" + (darkTheme ? " bg-slate-600" : " bg-white")}
                            placeholder="Your email" />
                        {errors?.email && <p className="text-red-500">This field is required</p>}
                    </div>
                    <div className="mb-[48px] form-check">
                        <label htmlFor="password" className="form-check-label" >Password</label>
                        <div className="relative">
                            <input
                                {...register("password", {
                                    required: "This field is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum of 6 characters"
                                    }
                                })}
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                className={"w-full px-4 py-2 mb-3 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1" + (darkTheme ? " bg-slate-600" : " bg-white")}
                                placeholder="Your password"
                            />
                            <button
                                className="absolute inset-y-0 right-0 -top-3 top- flex items-center px-4 text-gray-600"
                                onClick={togglePasswordVisible}
                            >
                                {passwordVisible ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="white"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="black"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="white"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="black"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors?.password && <p className="text-red-500">{errors?.password?.message as any}</p>}
                        <a href="#" className="cursor-pointer hover:text-amber-500 transition ease-in-out">Forgot password?</a>
                    </div>
                    <button type="button"
                        onClick={handleSubmit(onSubmit)}
                        className="form-submit-btn mb-8">Sign in</button>
                    <p className="text-center">Dont't have account? <Link className="underline text-blue-600 hover:text-blue-800" to={'/'}>Sign up</Link></p>
                </form>
            </div>
        </div>

    )
}