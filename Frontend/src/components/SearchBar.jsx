import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ data }) => {
    const navigate = useNavigate()
    const [input, setInput] = useState(data ? data : "")

    const onSearchHandler = (e) => {
        e.preventDefault()
        navigate("/coure-list/" + input)
    }

    return (
        <form onSubmit={onSearchHandler} className='max-w-xl w-full h-12 md:h-14 flex items-center bg-white border border-gray-500/20 rounded'>
            <img src={assets.search_icon} alt="search" className='w-10 md:w-auto px-3' />

            <input onChange={e => setInput(e.target.value)} value={input} type="text" placeholder='Search for courses' className='w-full h-full outline-none text-gray-500/80' />

            <button type='submit' className='bg-blue-600 rounded text-white px-7 md:px-10 py-2 md:py-3 mx-1 cursor-pointer'>Search</button>
        </form>
    )
}

export default SearchBar