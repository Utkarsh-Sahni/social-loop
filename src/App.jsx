import { Route, Routes } from 'react-router';

import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div>
      <div className='container-xl'>
        <Routes>
          <Route exact path= '/' element={<Login/>}/>
          <Route exact path= '/signup' element={<Signup/>}/>
          <Route exact path= '/home' element={<Home/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
