import { Route, Routes, useMatch } from "react-router-dom";
import Navbar from "./components/Navbar";

// Student Pages
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import CourseListPage from "./pages/CourseListPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import MyEnrollmentsPage from "./pages/MyEnrollmentsPage";
import PlayerPage from "./pages/PlayerPage";

// Educator Pages
import EducatorPage from "./pages/Educator/EducatorPage";
import DashboardPage from "./pages/Educator/DashboardPage";
import MyCoursesPage from "./pages/Educator/MyCoursesPage";
import StudentEnrolledPage from "./pages/Educator/StudentEnrolledPage";

const App = () => {
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-white">
      {!isEducatorRoute && <Navbar />}

      <Routes>
        {/* ----Student Routes---- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/course-list" element={<CourseListPage />} />
        <Route path="/course-list/:input" element={<CourseListPage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
        <Route path="/my-enrollments" element={<MyEnrollmentsPage />} />
        <Route path="/player/:id" element={<PlayerPage />} />

        {/* ----Educator Routes---- */}
        <Route path="/educator" element={<EducatorPage />}>
          <Route path="/educator" element={<DashboardPage />} />
          <Route path="my-courses" element={<MyCoursesPage />} />
          <Route path="student-enrolled" element={<StudentEnrolledPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
