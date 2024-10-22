import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home} from "./pages/home"
import { Navbar } from './components/Navbar';
import {Register} from "./pages/Register";
import { Login } from "./pages/loginPage"
import { Logout } from "./pages/logoutPage"
// import {Footer} from "./components/Footer"
import {ErrorPage} from './pages/ErrorPage';
import {Notes} from "./pages/Notes";


const App = () => {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/notes' element={<Notes/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </div>
      {/* <Footer/> */}
    </Router>
  );
};

export default App;
