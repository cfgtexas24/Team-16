import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../lib/auth';
import { getDecodedToken } from '../lib/auth';

function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const decodedToken = getDecodedToken();
      const { email } = decodedToken;
      
      const data = await fetchWithAuth('/api/client/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setProfile(data.client);
      setEditedProfile(data.client);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleSave = async () => {
    try {
      const response = await fetchWithAuth('/api/client/editProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedProfile),
      });
      if (response.ok) {
        setProfile(editedProfile);
        setIsEditing(false);
      } else {
        console.error('Error saving profile:', await response.text());
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...editedProfile.experiences];
    updatedExperiences[index][field] = value;
    setEditedProfile({ ...editedProfile, experiences: updatedExperiences });
  };

  const addExperience = () => {
    const newExperience = {
      employerName: '',
      roleName: '',
      description: '',
      startDate: '',
      endDate: '',
    };
    setEditedProfile({
      ...editedProfile,
      experiences: [...editedProfile.experiences, newExperience],
    });
  };

  const removeExperience = (index) => {
    const updatedExperiences = editedProfile.experiences.filter((_, i) => i !== index);
    setEditedProfile({ ...editedProfile, experiences: updatedExperiences });
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-view">
      <h2>Profile</h2>
      {isEditing ? (
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={editedProfile.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            LinkedIn:
            <input
              type="url"
              name="linkedin"
              value={editedProfile.linkedin}
              onChange={handleChange}
            />
          </label>
          <label>
            Skills (comma-separated):
            <input
              type="text"
              name="skills"
              value={editedProfile.skills.join(', ')}
              onChange={(e) => setEditedProfile({ ...editedProfile, skills: e.target.value.split(', ') })}
            />
          </label>
          <h3>Experiences</h3>
          {editedProfile.experiences.map((exp, index) => (
            <div key={index} className="experience-entry">
              <input
                type="text"
                placeholder="Employer Name"
                value={exp.employerName}
                onChange={(e) => handleExperienceChange(index, 'employerName', e.target.value)}
              />
              <input
                type="text"
                placeholder="Role Name"
                value={exp.roleName}
                onChange={(e) => handleExperienceChange(index, 'roleName', e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              />
              <input
                type="text"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
              />
              <input
                type="text"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
              />
              <button onClick={() => removeExperience(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addExperience}>Add Experience</button>
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <p>LinkedIn: {profile.linkedin}</p>
          <p>Skills: {profile.skills.join(', ')}</p>
          <h3>Experiences</h3>
          {profile.experiences.map((exp, index) => (
            <div key={index} className="experience-entry">
              <p>Employer: {exp.employerName}</p>
              <p>Role: {exp.roleName}</p>
              <p>Description: {exp.description}</p>
              <p>Start Date: {exp.startDate}</p>
              <p>End Date: {exp.endDate}</p>
            </div>
          ))}
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default ProfileView;
