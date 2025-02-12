import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Nopage from './Comp/Nopage';
import Page_Genaretar from './pages/Form_Genarater';
import LoginPage from './pages/login';
import RegisterPage from './pages/RegisterPage';
import Pdf_management from './pages/Pdf_management';
import UserView from './pages/UserView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/page_generater' element={<Page_Genaretar/>} />
        <Route path='*' element={<Nopage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/Pdf_management' element={<Pdf_management/>} />
        <Route path='/UserView' element={<UserView/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
