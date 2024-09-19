
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/login';
import Register from './Components/register';
import Home from './Components/home';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
    
  );
}

export default App;
