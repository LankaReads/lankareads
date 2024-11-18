import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import AdminHeader from '../../components/AdminHeader/AdminHeader';

const AdminDeliveryPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/deliveries');
        setDeliveries(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch deliveries');
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  // Delete a delivery by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deliveries/${id}`);
      // Update the local state to remove the deleted delivery
      setDeliveries(deliveries.filter(delivery => delivery._id !== id));
    } catch (err) {
      setDeleteError('Failed to delete delivery');
    }
  };

  if (loading) return <div className="text-center"><p>Loading...</p></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <><AdminHeader />
    <div className="container mt-4">
      
      <h1 className="mb-4">Delivery Orders</h1>
      {deleteError && <div className="alert alert-danger">{deleteError}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Cart Items</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery._id}>
                <td>{delivery.name}</td>
                <td>{delivery.email}</td>
                <td>{delivery.phone}</td>
                <td>{delivery.address}</td>
                <td>
                  {delivery.cartItems.map((item, idx) => (
                    <div key={idx}>
                      Book: {item.bookName}, Price: ${item.bookPrice}
                    </div>
                  ))}
                </td>
                <td>${delivery.totalPrice}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(delivery._id)}
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

export default AdminDeliveryPage;
