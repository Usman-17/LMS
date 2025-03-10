import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes >
      </BrowserRouter>
    </div>
  )
}

export default App