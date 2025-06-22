import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './App.css';
import HomePage from './pages/HomePage';
import LikedPage from './pages/LikedPage';
import PreviousPage from './pages/PreviousPage';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        
        <div className="flex-1 p-4 overflow-auto bg-gray-100 dark:bg-gray-800">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/liked" element={<LikedPage />} />
            <Route path="/previous" element={<PreviousPage />} />
          </Routes>
          <Toaster />
        </div>
      </div>
    </Router>
  );
}

export default App;
