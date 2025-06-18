import { useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import './index.styles.scss'; // Import the SCSS file from the same directory

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:8080/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users. You might not have admin privileges.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className={clsx("admin-page-loading")}><div className={clsx("spinner")}></div></div>;
  }

  if (error) {
    return <div className={clsx("admin-page-error")}><p className={clsx("error-message")}>{error}</p></div>;
  }

  return (
    <div className={clsx("admin-page-container")}>
      <h1 className={clsx("admin-page-title")}>
        Admin Panel - User List
      </h1>
      <ul className={clsx("user-list")}>
        {users.map((user) => (
          <li key={user.id} className={clsx("user-list-item")}>
            <span className={clsx("user-name")}>Name: {user.name || 'N/A'} (ID: {user.id})</span>
            <span className={clsx("user-details")}>Email: {user.email} | Role: {user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage; 