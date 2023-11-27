// import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './pages/AddUser';
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import AccountDetails from './pages/AccountDetails';
import CreateAccount from './pages/CreateAccount';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userhome" element={<UserHome/>} />
          <Route path="/accountdetails" element={<AccountDetails/>}/>
          <Route path="/createaccount" element={<CreateAccount/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
