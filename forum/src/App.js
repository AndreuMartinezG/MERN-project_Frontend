import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './Components/Footer/Footer';
import './Components/Header/Header';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
        <Route path={'/'} element={<Home/>} />
        <Route path={'/profile'} element={<Profile/>} />
        <Route path={'/register'} element={<Register/>} />
          
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
