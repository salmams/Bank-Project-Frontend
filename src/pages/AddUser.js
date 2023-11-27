import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../layout/Navbar';

export default function AddUser() {
    let navigate = useNavigate();
    const [user,setUser]=useState({
        name:"",
        phone:"",
        password:""
    })
    const{name,phone,password}= user;
    const onInputChange=(e)=>{
        setUser({ ...user,[e.target.name]:e.target.value})
    }
    const onSubmit=async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/addCustomer",user);
        navigate("/");
    }
  return (
    <div>
    <Navbar page='register'/>
    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Register User</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Phone" className="form-label">
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
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type={"password"}
              className="form-control"
              placeholder="Create a password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Submit
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
