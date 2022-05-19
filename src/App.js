import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import DataNotFound from './Pages/Share/DataNotFound';
import Login from '../src/Pages/Login/Login';
import SignIn from '../src/Pages/Login/SignIn';
import Nav from '../src/Pages/Share/Nav';
import GetData from './Pages/AddText/GetData';
import RequareAuth from './Pages/Share/RequareAuth';

function App() {
  return (
    <div>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/adddata' element={<RequareAuth><GetData></GetData></RequareAuth>}></Route>
        <Route path='/signin' element={<SignIn></SignIn>}></Route>
        <Route path='*' element={<DataNotFound></DataNotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
