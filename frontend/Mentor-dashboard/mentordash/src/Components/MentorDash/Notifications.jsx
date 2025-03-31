/*correction has been done*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';

const Notifications = ({ notifications = [], onRead }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate unread count dynamically from notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;

  const toggleNotifications = () => {
    setIsOpen(!isOpen);

    if (!isOpen && unreadCount > 0) {
      // Mark notifications as read when opened
      onRead();
    }
  };

  return (
    <div className="notifications-container">
      <button className="notifications-icon" onClick={toggleNotifications}>
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
          </div>

          {notifications.length > 0 ? (
            <ul className="notifications-list">
              {notifications.map((notification, index) => (
                <li key={index} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {isNaN(new Date(notification.timestamp)) 
                        ? 'Invalid date' 
                        : new Date(notification.timestamp).toLocaleString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-notifications">No notifications to display.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Prop validation
Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      read: PropTypes.bool,
      timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  onRead: PropTypes.func.isRequired,
};

export default Notifications;
