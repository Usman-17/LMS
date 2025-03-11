import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const Footer = () => {
    const getCurrentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 px-20 md:px-36 w-full">
            <div className="w-full max-w-screen-xl mx-auto py-4 sm:md:pt-8">
                <div className="sm:flex sm:items-center sm:justify-between p-2 sm:p-0">
                    <Link to={"/"} >
                        <img src={assets.logo_dark} alt="logo" className='mb-4' />
                    </Link>

                    <ul className="flex flex-wrap items-center text-sm font-medium text-white/80 sm:mb-0 ">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>

                <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />

            </div>
            <span className="block text-sm text-gray-500 text-center dark:text-gray-400 py-2">© {getCurrentYear} Edmey™ . All Rights Reserved.</span>
        </footer >
    )
}

export default Footer