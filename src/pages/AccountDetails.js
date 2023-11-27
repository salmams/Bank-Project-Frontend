import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    type: '',
    branch: '',
    ifsccode: '',
  });

  useEffect(() => {
    const customerId = JSON.parse(sessionStorage.getItem("userId"));

    const accountUrl = `http://localhost:8080/account/${customerId}`;
    const accountTypeUrl = `http://localhost:8080/accounttype/1`;
    const branchUrl = `http://localhost:8080/branch/KLR123`;
    const customerUrl = `http://localhost:8080/customer/${customerId}`;

    Promise.all([
      axios.get(accountUrl),
      axios.get(accountTypeUrl),
      axios.get(branchUrl),
      axios.get(customerUrl),
    ])
      .then(responses => {
        console.log('Account Response:', responses[0]);
        console.log('Account Type Response:', responses[1]);
        console.log('Branch Response:', responses[2]);
        console.log('Customer Response:', responses[3]);

        const accountData = responses[0].data[0];
        const accountTypeData = responses[1].data[0];
        const branchData = responses[2].data[0];
        const customerData = responses[3].data[0];

        if (accountData && customerData && accountTypeData && branchData) {
          setAccountDetails({
            id: accountData.id || '',
            name: customerData.name || '',
            address: customerData.city || '',
            phone: customerData.phone || '',
            type: accountTypeData.type || '',
            branch: branchData.branch || '',
            ifsccode: branchData.ifsccode || '',
          });
        } else {
          console.error('Error: One or more responses are empty or do not have the expected structure');
        }
      })
      .catch(error => {
        console.error('Error fetching account details:', error);
      });
  }, []);

  return (
    <div>
      <header>
        <h1>Bank of Impaqtive</h1>
      </header>

      <section>
        <h2>Account Details</h2>
        <table>
          <tbody>
            <tr>
              <th>Account Number</th>
              <td>{accountDetails.id}</td>
            </tr>
            <tr>
              <th>Account Holder's Name</th>
              <td>{accountDetails.name}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{accountDetails.address}</td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>{accountDetails.phone}</td>
            </tr>
            <tr>
              <th>Account Type</th>
              <td>{accountDetails.type}</td>
            </tr>
            <tr>
              <th>Branch Name</th>
              <td>{accountDetails.branch}</td>
            </tr>
            <tr>
              <th>IFSC Code</th>
              <td>{accountDetails.ifsccode}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AccountDetails;
