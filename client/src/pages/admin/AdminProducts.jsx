import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

const AdminProducts = () => {
  const { getAuthToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const token = getAuthToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get('http://localhost:5000/api/products', { headers });
      setProducts(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <h1
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#212121',
              }}
            >
              Products Management
            </h1>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#00BCD4',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#00ACC1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#00BCD4';
              }}
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {/* Search Bar */}
          <div
            style={{
              marginBottom: '20px',
              position: 'relative',
              maxWidth: '400px',
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
              placeholder="Search products..."
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

          {/* Products Table */}
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
            ) : filteredProducts.length === 0 ? (
              <p style={{ color: '#757575', textAlign: 'center', padding: '40px' }}>
                No products found
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
                        Image
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
                        Name
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
                        Category
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
                        Price
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
                        Stock
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
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr
                        key={product._id}
                        style={{
                          borderBottom: '1px solid #ECEFF1',
                        }}
                      >
                        <td
                          style={{
                            padding: '12px 20px',
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                            }}
                          />
                        </td>
                        <td
                          style={{
                            padding: '12px 20px',
                            fontSize: '14px',
                            color: '#212121',
                          }}
                        >
                          {product.name}
                        </td>
                        <td
                          style={{
                            padding: '12px 20px',
                            fontSize: '14px',
                            color: '#757575',
                          }}
                        >
                          {product.category}
                        </td>
                        <td
                          style={{
                            padding: '12px 20px',
                            fontSize: '14px',
                            color: '#212121',
                            fontWeight: '500',
                          }}
                        >
                          ${product.price}
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
                              backgroundColor: product.inStock ? '#E8F5E9' : '#FFEBEE',
                              color: product.inStock ? '#2E7D32' : '#C62828',
                            }}
                          >
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: '12px 20px',
                            display: 'flex',
                            gap: '8px',
                          }}
                        >
                          <button
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '32px',
                              height: '32px',
                              border: 'none',
                              backgroundColor: '#ECEFF1',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              color: '#212121',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#CFD8DC';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#ECEFF1';
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '32px',
                              height: '32px',
                              border: 'none',
                              backgroundColor: '#FFEBEE',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              color: '#F44336',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFCDD2';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFEBEE';
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
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

export default AdminProducts;

