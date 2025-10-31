import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Home } from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  ];

  return (
    <aside
      className="admin-sidebar"
      style={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#263238',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo Area */}
      <div
        className="admin-logo-area"
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h1
          style={{
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: '600',
            margin: 0,
            fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
          }}
        >
          Admin Panel
        </h1>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="admin-sidebar-item"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                backgroundColor: isActive ? 'rgba(0, 188, 212, 0.1)' : 'transparent',
                borderLeft: isActive ? '3px solid #00BCD4' : '3px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
                fontSize: '14px',
                fontWeight: '400',
                cursor: 'pointer',
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.className.includes('active')) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                const isActive = window.location.pathname === item.path;
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon
                size={20}
                style={{
                  marginRight: '12px',
                }}
              />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Back to Home Link */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <NavLink
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            color: 'rgba(255, 255, 255, 0.7)',
            textDecoration: 'none',
            fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
            fontSize: '14px',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Home size={20} style={{ marginRight: '12px' }} />
          Back to Store
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;

