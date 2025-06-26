
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import RegisterPage from './pages/RegisterPage';

function App() {
  

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={ <HomePage/> } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
