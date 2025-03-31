/* correction has been made */
import React from 'react';
import PropTypes from 'prop-types';
import './ActivitySections.css';

const ActivitySections = ({ activities = [] }) => {
  // Validate activities array
  if (!Array.isArray(activities)) {
    return <p className="error">Invalid activities data.</p>;
  }

  return (
    <section className="dashboard-card activity-section">
      <div className="card-header">
        <h2>Recent Activity</h2>
      </div>

      {activities.length > 0 ? (
        <ul className="activity-list">
          {activities.map((activity) => (
            <li key={activity.id || Math.random()} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'course' && <i className="fas fa-book-open"></i>}
                {activity.type === 'assignment' && <i className="fas fa-tasks"></i>}
                {activity.type === 'achievement' && <i className="fas fa-trophy"></i>}
                {!['course', 'assignment', 'achievement'].includes(activity.type) && (
                  <i className="fas fa-info-circle"></i>
                )}
              </div>
              <div className="activity-content">
                <p>{activity.description || 'No description available.'}</p>
                <span className="activity-date">
                  {activity.date && !isNaN(Date.parse(activity.date))
                    ? new Date(activity.date).toLocaleDateString()
                    : 'Date not available'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">No recent activities to display.</p>
      )}
    </section>
  );
};

// PropTypes for validation
ActivitySections.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
    })
  ).isRequired,
};

export default ActivitySections;