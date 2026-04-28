import { useEffect, useState } from 'react';
import API from '../../api/axios';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/users');
      setUsers(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const toggleAdmin = async (u) => {
    try {
      await API.put(`/users/${u._id}`, { isAdmin: !u.isAdmin });
      toast.success('Updated');
      load();
    } catch (err) { toast.error('Failed'); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await API.delete(`/users/${id}`);
      toast.success('Deleted');
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Users</h1>
      <div className="bg-white border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-3 font-medium">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || '-'}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={u.isAdmin} onChange={() => toggleAdmin(u)} className="accent-primary-500 w-4 h-4" />
                  </label>
                </td>
                <td className="p-3">
                  <button onClick={() => remove(u._id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
