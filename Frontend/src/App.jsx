import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage';
import Footer from "./components/Footer";
import CourseListPage from "./pages/CourseListPage";

const App = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course-list" element={<CourseListPage />} />
          <Route path="/course-list/:input" element={<CourseListPage />} />

        </Routes >
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App