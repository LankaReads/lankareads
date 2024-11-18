import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      setDeleteError('Failed to delete user');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Users</h1>

        {deleteError && <p className="text-danger text-center">{deleteError}</p>}

        <table className="table table-striped table-hover table-responsive-md">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-center">
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
