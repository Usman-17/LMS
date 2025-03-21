import { assets } from "../assets/assets.js"
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";


const Navbar = () => {
    // For Change Navbar Color
    const isCourseListPage = ["/course-list", "/my-enrollments"].some(path => location.pathname.includes(path))
        || location.pathname.startsWith("/player/");

    const { openSignIn } = useClerk()
    const { user } = useUser()

    const { isEducator } = useContext(AppContext)

    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-300 py-4 ${isCourseListPage ? "bg-white" : "bg-cyan-100/70"}`}>

            {/* logo */}
            <Link to={"/"}>
                <img src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' />
            </Link>

            {/* Nav Links */}
            <div className='hidden md:flex items-center gap-5 text-gray-500'>
                {user &&
                    <>
                        <Link to="/educator">
                            <button className="cursor-pointer pr-5">{isEducator ? "Educator Dashboard" : "Become Educator"}</button> | {" "}
                        </Link>
                        <Link to={"/my-enrollments"}>My Enrollments</Link>
                    </>
                }

                {/* Create button */}
                {user ? <UserButton /> : <button onClick={() => openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer hover:bg-blue-700 transform'>Create Account</button>
                }
            </div>

            {/* For Phone Screen */}
            <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500 ">
                <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
                    {user &&
                        <>
                            <Link to="/educator">
                                <button className="cursor-pointer">{isEducator ? "Educator Dashboard" : "Become Educator"}</button> |
                            </Link>
                            <Link to={"/my-enrollments"} >My Enrollments</Link>
                        </>
                    }
                </div>

                {user ?
                    <UserButton /> :
                    <button onClick={() => openSignIn()} className="cursor-pointer"><img src={assets.user_icon} alt="user_icon" />
                    </button>
                }
            </div>
        </div>
    )
}

export default Navbar