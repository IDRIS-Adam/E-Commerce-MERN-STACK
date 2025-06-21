
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';

function App() {
  

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={ <HomePage/> } />
        <Route path='/login' element={ <LoginPage/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
