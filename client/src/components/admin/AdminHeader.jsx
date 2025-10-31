import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header
      className="admin-header"
      style={{
        height: '64px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        marginLeft: '250px',
      }}
    >
      {/* Search Bar */}
      <div style={{ flex: 1, maxWidth: '400px', position: 'relative' }}>
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
          placeholder="Search..."
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

      {/* Right Side Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            color: '#757575',
            marginRight: '8px',
          }}
        >
          {user?.username}
        </span>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            border: 'none',
            backgroundColor: 'transparent',
            borderRadius: '4px',
            cursor: 'pointer',
            color: '#757575',
            fontSize: '14px',
            fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFEBEE';
            e.currentTarget.style.color = '#F44336';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#757575';
          }}
          title="Logout"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;

