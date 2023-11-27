  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';

  export default function Navbar({ page }) {

    const [showLoan,setShowLoan] = useState(false);
    const [showCard,setShowCard] = useState(false);

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Bank Of Impaqtive
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {page === 'login' || page === 'register' || page==='home'? (
              <>
                <Link className="btn btn-outline-light" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-light" to="/adduser">
                  Register
                </Link>
              </>
            ) :  (
              <>
              <Link className='btn me-2 btn-primary' to='/createaccount'>
                Create Account
              </Link>
              <Link className='btn me-2 btn-primary' to='/accountdetails'>
                Account Details
              </Link>
              <Link className='btn me-2 btn-primary' to='/transfermoney'>
                Transfer Money
              </Link>
              <Link className='btn me-2 btn-primary' to='/transactionhistory'>
                Transaction History
              </Link>
              {/* Loan Dropdown */}
              <div className="dropdown me-2">
                <button
                  className="btn btn-primary DropdownLabel"
                  type="button"
                  id="loanDropdown"
                  onClick={() => setShowLoan(!showLoan)}
                >
                  Loan
                </button>
                { showLoan &&
                  <div className='Dropdown'>
                    <ul>
                      <li>
                        <Link className="dropdown-item" to="/applyloan">
                          Apply
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/loandetails">
                          Details
                        </Link>
                      </li>
                    </ul>
                  </div>
                } 
              </div>
                
              {/* Card dropdown */}
              <div className="dropdown me-2">
                <button
                  className="btn btn-primary DropdownLabel"
                  type="button"
                  id="cardDropdown"
                  onClick={() => setShowCard(!showCard)}
                >
                  Cards
                </button>
                { showCard &&
                  <div className='Dropdown'>
                    <ul>
                      <li>
                        <Link className="dropdown-item" to="/applycard">
                          Apply Card
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/cardmanagement">
                          Card Management
                        </Link>
                      </li>
                    </ul>
                  </div>
                } 
              </div> 

              <Link className='btn me-2 btn-primary' to='/'>
                Log out
              </Link>
              </>
              )}
          </div>
        </nav>
      </div>
    );
  }
