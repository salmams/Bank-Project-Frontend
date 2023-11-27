import React, { useEffect, useRef } from 'react';
import './UserHome.css';
import Navbar from '../layout/Navbar'; 
import { useLocation } from 'react-router-dom';

const UserHome = () => {
  const location = useLocation();
  // console.log(location.state);
  const customerId = location.state ? location.state : null;
  console.log(customerId);
  const loanImageRef = useRef(null);

  useEffect(() => {
    const loanImageUrls = [
      "/images/loan.jpg",
      "/images/loan2.jpg",
      "/images/loan3.png",
      // Add more image URLs as needed
    ];

    let currentIndex = 0;

    const rotateLoanImages = () => {
      loanImageRef.current.src = loanImageUrls[currentIndex];
      currentIndex = (currentIndex + 1) % loanImageUrls.length;
    };

    const intervalId = setInterval(rotateLoanImages, 2000); // Change image every 2 seconds (2000 milliseconds)

    
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="userhome-container">
        {/* Section 1: Display Account Balance */}
        <div className="userhome-portfolio">
          <div style={{ textAlign: 'center' }}>
        <div style={{ padding: '20px' }}>
          <h2>Account Balance</h2>
          <p>Your current balance is: $1,000,000</p>
          </div>
          <div style={{ padding: '20px' }}>
          <h2>Deposits</h2>
          <p>Deposits: $500,000</p>
          </div>
          <div style={{ padding: '20px' }}>
          <h2>Loans</h2>
          <p>Loans: 0</p>
          </div>
          </div>
        </div>

        {/* Section 2: Advertisement about Loans */}
        <div className="userhome-loanimage">
          <h2>Get a Loan Today!</h2>
          <p>We offer competitive loan rates to meet your financial needs. Apply now!</p>
          <img ref={loanImageRef} alt="Illustration of a loan" />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
