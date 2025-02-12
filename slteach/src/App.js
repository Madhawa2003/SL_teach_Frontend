import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Nopage from './Comp/Nopage';
import Page_Genarater from './pages/Form_Genarater';
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import Pdf_management from './pages/Pdf_management';
import UserView from './pages/UserView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />
        
        {/* Other routes */}
        <Route path="/page_generater" element={<Page_Genarater />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Pdf_management" element={<Pdf_management />} />
        <Route path="/UserView" element={<UserView />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
