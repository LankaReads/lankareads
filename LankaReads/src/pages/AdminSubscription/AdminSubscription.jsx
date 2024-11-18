import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import AdminHeader from '../../components/AdminHeader/AdminHeader';

const AdminSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  // Fetch subscriptions on component mount
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/subscriptions');
        setSubscriptions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch subscriptions');
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  // Delete a subscription by email
  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/api/subscriptions/${encodeURIComponent(email)}`);
      setSubscriptions(subscriptions.filter(sub => sub.email !== email));
    } catch (err) {
      setDeleteError('Failed to delete subscription');
    }
  };

  if (loading) return <div className="text-center"><p>Loading...</p></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
    <AdminHeader/>
    <div className="container mt-4">
      <h1 className="mb-4">Subscriptions</h1>
      {deleteError && <div className="alert alert-danger">{deleteError}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription, index) => (
              <tr key={index}>
                <td>{subscription.name}</td>
                <td>{subscription.email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(subscription.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></>
  );
};

export default AdminSubscription;
