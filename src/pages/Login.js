import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../layout/Navbar';

export default function Login() {
    let navigate = useNavigate();
    const [user,setUser]=useState({
        phone:"",
        password:""
    })
    const{phone,password}= user;
    const onInputChange=(e)=>{
        setUser({ ...user,[e.target.name]:e.target.value})
    }
    const handleLogin = async (e) => {
      e.preventDefault();
      // console.log('Login data:', { phone, password }); 
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, password }),
            });
            // console.log(response);
            if (response.ok) {
                // If the login was successful, navigate to the home page
                const userId = await response.json();
                
                if (userId) {
                  sessionStorage.setItem("userId", JSON.stringify(userId));
                }

                console.log('User ID:', userId);
                navigate('/userhome', { state: { userId } });
            } else {
                // Handle login failure, show error message, etc.
                console.error('Login failed:', response.statusText);
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
  return ( 
    <div>
      <Navbar page='login' />
    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your phone number"
              name="phone"
              value={phone}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={"password"}
              className="form-control"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Login
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  </div>
  </div>
  )
}
