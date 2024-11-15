import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Users, Store, ShoppingBag, ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react';

type Role = 'admin' | 'dealer' | 'customer';

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@rks.com', role: 'admin', status: 'active', lastLogin: '2024-02-28 10:30' },
  { id: 2, name: 'John Dealer', email: 'john@dealer.com', role: 'dealer', status: 'active', lastLogin: '2024-02-28 09:15' },
  { id: 3, name: 'Sarah Customer', email: 'sarah@email.com', role: 'customer', status: 'active', lastLogin: '2024-02-27 15:45' },
];

const AdminPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>('admin');
  const [expandedSection, setExpandedSection] = useState<string | null>('users');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case 'admin':
        return <Users className="h-5 w-5" />;
      case 'dealer':
        return <Store className="h-5 w-5" />;
      case 'customer':
        return <ShoppingBag className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Add New User
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <h2 className="text-lg font-semibold">Admins</h2>
              </div>
              <span className="text-2xl font-bold">3</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Store className="h-6 w-6 text-green-600" />
                <h2 className="text-lg font-semibold">Dealers</h2>
              </div>
              <span className="text-2xl font-bold">12</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
                <h2 className="text-lg font-semibold">Customers</h2>
              </div>
              <span className="text-2xl font-bold">158</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow">
            <button
              className="w-full px-6 py-4 flex items-center justify-between"
              onClick={() => toggleSection('users')}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-600" />
                <span className="font-semibold">User Management</span>
              </div>
              {expandedSection === 'users' ? (
                <ChevronUp className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {expandedSection === 'users' && (
              <div className="p-6 border-t">
                <div className="flex space-x-4 mb-6">
                  {(['admin', 'dealer', 'customer'] as Role[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                        selectedRole === role
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {getRoleIcon(role)}
                      <span className="capitalize">{role}s</span>
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockUsers
                        .filter((user) => user.role === selectedRole)
                        .map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{user.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                {getRoleIcon(user.role)}
                                <span className="capitalize">{user.role}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              {user.lastLogin}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Edit className="h-5 w-5" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;