import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage';
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes >
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App