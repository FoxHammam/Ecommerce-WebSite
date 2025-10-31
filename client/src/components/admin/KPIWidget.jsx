import React from 'react';

const KPIWidget = ({ title, value, icon: Icon, trend, color = '#00BCD4' }) => {
  return (
    <div
      className="kpi-widget"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 188, 212, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {Icon && <Icon size={24} style={{ color: '#00BCD4' }} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#757575',
            fontWeight: '400',
            marginBottom: '4px',
          }}
        >
          {title}
        </p>
        <h3
          style={{
            margin: 0,
            fontSize: '24px',
            color: '#212121',
            fontWeight: '600',
          }}
        >
          {value}
        </h3>
        {trend && (
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: '12px',
              color: trend > 0 ? '#4CAF50' : '#F44336',
              fontWeight: '400',
            }}
          >
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
    </div>
  );
};

export default KPIWidget;

