import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import KPIWidget from '../../components/admin/KPIWidget';
import { DollarSign, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

const AdminDashboard = () => {
  const { getAuthToken } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = getAuthToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const [ordersRes, productsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/orders', { headers }),
        axios.get('http://localhost:5000/api/products', { headers }),
      ]);

      const orders = ordersRes.data.data || [];
      const products = productsRes.data.data || [];

      const revenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      const pending = orders.filter((order) => order.status === 'pending').length;

      setStats({
        totalOrders: orders.length,
        totalRevenue: revenue,
        totalProducts: products.length,
        pendingOrders: pending,
      });

      setRecentOrders(orders.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
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
            Dashboard
          </h1>

          {/* KPI Widgets */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <KPIWidget
              title="Total Revenue"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              icon={DollarSign}
              trend={12}
            />
            <KPIWidget
              title="Total Orders"
              value={stats.totalOrders}
              icon={ShoppingCart}
              trend={8}
            />
            <KPIWidget
              title="Total Products"
              value={stats.totalProducts}
              icon={Package}
              trend={5}
            />
            <KPIWidget
              title="Pending Orders"
              value={stats.pendingOrders}
              icon={TrendingUp}
              trend={-3}
            />
          </div>

          {/* Recent Orders Table */}
          <div
            className="admin-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#212121',
                marginBottom: '20px',
              }}
            >
              Recent Orders
            </h2>
            {loading ? (
              <p style={{ color: '#757575', textAlign: 'center', padding: '40px' }}>
                Loading...
              </p>
            ) : recentOrders.length === 0 ? (
              <p style={{ color: '#757575', textAlign: 'center', padding: '40px' }}>
                No orders yet
              </p>
            ) : (
              <div
                style={{
                  overflowX: 'auto',
                }}
              >
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
                    {recentOrders.map((order) => (
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
                            color: '#212121',
                          }}
                        >
                          {order.fullName}
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
                          }}
                        >
                          ${order.totalAmount}
                        </td>
                        <td
                          style={{
                            padding: '12px 20px',
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '4px 12px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '500',
                              backgroundColor:
                                order.status === 'pending'
                                  ? '#FFF3E0'
                                  : order.status === 'delivered'
                                  ? '#E8F5E9'
                                  : '#E3F2FD',
                              color:
                                order.status === 'pending'
                                  ? '#F57C00'
                                  : order.status === 'delivered'
                                  ? '#2E7D32'
                                  : '#1976D2',
                            }}
                          >
                            {order.status}
                          </span>
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

export default AdminDashboard;

