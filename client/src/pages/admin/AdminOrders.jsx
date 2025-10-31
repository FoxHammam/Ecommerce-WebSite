import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { Search, Filter } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

const AdminOrders = () => {
  const { getAuthToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchOrders = async () => {
    try {
      const token = getAuthToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get('http://localhost:5000/api/orders', { headers });
      setOrders(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    pending: { bg: '#FFF3E0', color: '#F57C00' },
    confirmed: { bg: '#E3F2FD', color: '#1976D2' },
    processing: { bg: '#E8EAF6', color: '#5C6BC0' },
    shipped: { bg: '#E0F2F1', color: '#00695C' },
    delivered: { bg: '#E8F5E9', color: '#2E7D32' },
    cancelled: { bg: '#FFEBEE', color: '#C62828' },
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#F4F7F9',
        fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
      }}
    >
      <AdminSidebar />
      <div
        style={{
          flex: 1,
          marginLeft: '250px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AdminHeader />
        <main
          style={{
            padding: '24px',
            flex: 1,
          }}
        >
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#212121',
              marginBottom: '24px',
            }}
          >
            Orders Management
          </h1>

          {/* Filters */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '20px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                position: 'relative',
                flex: 1,
                minWidth: '300px',
              }}
            >
              <Search
                size={20}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#757575',
                }}
              />
              <input
                type="text"
                placeholder="Search by customer, product, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  border: '1px solid #CFD8DC',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#00BCD4';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#CFD8DC';
                }}
              />
            </div>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Filter
                size={20}
                style={{
                  position: 'absolute',
                  left: '12px',
                  color: '#757575',
                }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '10px 12px 10px 40px',
                  border: '1px solid #CFD8DC',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
                  outline: 'none',
                  cursor: 'pointer',
                  backgroundColor: '#FFFFFF',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#00BCD4';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#CFD8DC';
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div
            className="admin-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            }}
          >
            {loading ? (
              <p style={{ color: '#757575', textAlign: 'center', padding: '40px' }}>
                Loading...
              </p>
            ) : filteredOrders.length === 0 ? (
              <p style={{ color: '#757575', textAlign: 'center', padding: '40px' }}>
                No orders found
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: '#F4F7F9',
                        borderBottom: '1px solid #ECEFF1',
                      }}
                    >
                      <th
                        style={{
                          padding: '12px 20px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#212121',
                        }}
                      >
                        Order ID
                      </th>
                      <th
                        style={{
                          padding: '12px 20px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#212121',
                        }}
                      >
                        Customer
                      </th>
                      <th
                        style={{
                          padding: '12px 20px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#212121',
                        }}
                      >
                        Product
                      </th>
                      <th
                        style={{
                          padding: '12px 20px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#212121',
                        }}
                      >
                        Amount
                      </th>
                      <th
                        style={{
                          padding: '12px 20px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#212121',
                        }}
                      >
                        Status
                      </th>
                      <th
                        style={{
                          padding: '12px 20px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#212121',
                        }}
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order._id}
                        style={{
                          borderBottom: '1px solid #ECEFF1',
                        }}
                      >
                        <td
                          style={{
                            padding: '12px 20px',
                            fontSize: '14px',
                            color: '#757575',
                            fontFamily: 'monospace',
                          }}
                        >
                          {order._id.slice(-8)}
                        </td>
                        <td
                          style={{
                            padding: '12px 20px',
                            fontSize: '14px',
                            color: '#212121',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: '500' }}>{order.fullName}</div>
                            <div
                              style={{
                                fontSize: '12px',
                                color: '#757575',
                                marginTop: '2px',
                              }}
                            >
                              {order.phone}
                            </div>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: '12px 20px',
                            fontSize: '14px',
                            color: '#212121',
                          }}
                        >
                          {order.productName}
                        </td>
                        <td
                          style={{
                            padding: '12px 20px',
                            fontSize: '14px',
                            color: '#212121',
                            fontWeight: '500',
                          }}
                        >
                          ${order.totalAmount}
                        </td>
                        <td
                          style={{
                            padding: '12px 20px',
                          }}
                        >
                          <select
                            value={order.status}
                            onChange={(e) => {
                              // Handle status update here
                              console.log('Update status:', order._id, e.target.value);
                            }}
                            style={{
                              padding: '4px 12px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '500',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor:
                                statusColors[order.status]?.bg || '#F4F7F9',
                              color: statusColors[order.status]?.color || '#212121',
                              fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td
                          style={{
                            padding: '12px 20px',
                            fontSize: '14px',
                            color: '#757575',
                          }}
                        >
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminOrders;

