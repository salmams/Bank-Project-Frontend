import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  let navigate = useNavigate();
  const customerId = JSON.parse(sessionStorage.getItem("userId"));

  const [formData, setFormData] = useState({
    account_type_id: 0,  // Change the initial value to an empty string
    ifsc_code: '',
    balance: '',
  });

  const [accountTypes, setAccountTypes] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchAccountTypes();
    fetchBranch();
  }, []);

  const fetchAccountTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/accounttypes');
      setAccountTypes(response.data);
      console.log('Fetched account types:', response.data);
    } catch (error) {
      console.error('Error fetching account types:', error);
    }
  };

  const fetchBranch = async () => {
    try {
      const response = await axios.get("http://localhost:8080/branches");
      setBranches(response.data);
      console.log("Fetched branches: ", response.data);
    } catch (error) {
      console.error("Error in fetching branches: ", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    });
  };
  const dataToSend = {
    ...formData,
    account_type_id: parseInt(formData.account_type_id), 
    balance: parseInt(formData.balance), 
    customerId: customerId,
  };

  console.log(dataToSend);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/addAccount", dataToSend);
      alert("Account created successfully!");
      navigate("/userhome");
    } catch (error) {
      console.error('Error creating customer:', error.response);
      if (error.response) {
        console.error('Server response data:', error.response.data);
        console.error('Server response status:', error.response.status);
        console.error('Server response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  return (
    <div>
      <h2>Create a Bank Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Account Type:
          <select
            name="account_type_id"
            value={formData.account_type_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Account Type</option>
            {accountTypes.map((type) => (
              <option key={type.acctype_id} value={type.acctype_id}>
                {type.account_type}
              </option>
            ))}
          </select>
        </label>

        <br />
        
        <label>
          Branch:
          <select
            name="ifsc_code"
            value={formData.ifsc_code}
            onChange={handleChange}
            required
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.ifsccode} value={branch.ifsccode}>
                {branch.name}
              </option>
            ))}
          </select>
        </label>

        <br />
        <label>
          Initial Deposit:
          <input
            type="number"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
  