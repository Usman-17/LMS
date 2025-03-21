import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Educator/Navbar'
import Sidebar from '../../components/Educator/Sidebar'

const EducatorPage = () => {
    return (
        <div className='text-default min-h-screen bg-white'>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <div className='flex-1'>
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}

export default EducatorPage