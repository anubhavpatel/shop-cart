
import './App.css';
import LoginForm from "./components/LoginForm"
import Home from "./components/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import Cart from './components/Cart';
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Protected Component={Home} />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/gotohome" element={<Home/>}/>
      </Routes>
   <Toaster/>
    </BrowserRouter>
  );

}

export default App;
