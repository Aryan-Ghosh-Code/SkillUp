/* correction has been done */
import React, { useState, useEffect } from 'react';
import './SkillsSection.css';

const SkillsSection = ({ skills, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skillsList, setSkillsList] = useState(skills || []);
  const [newSkill, setNewSkill] = useState('');

  // Ensure skillsList updates when the skills prop changes
  useEffect(() => {
    setSkillsList(skills || []);
  }, [skills]);

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      const updatedSkills = [...skillsList, { name: newSkill, level: 1 }];
      setSkillsList(updatedSkills);
      setNewSkill('');
      onUpdate(updatedSkills); // Update parent component immediately
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skillsList.filter((_, i) => i !== index);
    setSkillsList(updatedSkills);
    onUpdate(updatedSkills);
  };

  const handleSkillLevelChange = (index, level) => {
    const updatedSkills = skillsList.map((skill, i) =>
      i === index ? { ...skill, level } : skill
    );
    setSkillsList(updatedSkills);
    onUpdate(updatedSkills);
  };

  return (
    <section className="dashboard-card skills-section">
      <div className="card-header">
        <h2>Skills</h2>
        <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <div className="skills-edit">
          <div className="add-skill">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill"
            />
            <button onClick={handleAddSkill}>Add</button>
          </div>

          <ul className="skills-list">
            {skillsList.map((skill, index) => (
              <li key={index} className="skill-item-edit">
                <div className="skill-info">
                  <span>{skill.name}</span>
                  <div className="skill-level-selector">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        className={`level-button ${skill.level >= level ? 'active' : ''}`}
                        onClick={() => handleSkillLevelChange(index, level)}
                        aria-label={`Set ${skill.name} level to ${level}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="remove-skill" onClick={() => handleRemoveSkill(index)}>
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="skills-display">
          {skillsList.length > 0 ? (
            <ul className="skills-list">
              {skillsList.map((skill, index) => (
                <li key={index} className="skill-item">
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-level">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`level-indicator ${skill.level >= level ? 'filled' : ''}`}
                      ></div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">No skills added yet. Click Edit to add skills.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
