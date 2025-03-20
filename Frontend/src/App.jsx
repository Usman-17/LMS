import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage';
import Footer from "./components/Footer";
import CourseListPage from "./pages/CourseListPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import MyEnrollmentsPage from "./pages/MyEnrollmentsPage";
import PlayerPage from "./pages/PlayerPage";

const App = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course-list" element={<CourseListPage />} />
          <Route path="/course-list/:input" element={<CourseListPage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/my-enrollments" element={<MyEnrollmentsPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
        </Routes >
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App