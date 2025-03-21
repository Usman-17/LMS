import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Educator/Navbar'

const EducatorPage = () => {
    return (
        <div className='text-default min-h-screen bg-white'>
            <Navbar />
            <div>
                {<Outlet />}
            </div>
        </div>
    )
}

export default EducatorPage