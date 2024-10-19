import React, { useState, useEffect } from 'react';
import { fetchWithAuth, getDecodedToken } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  TextField,
  Collapse,
  Button,
  Typography,
  Card,
  Grid,
} from '@mui/material';
import { Edit, Save, Cancel, Add, ArrowBack, Delete } from '@mui/icons-material';
import AppLayout from "./AppLayout";

function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const navigate = useNavigate();

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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
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

  const addExperience = () => {
    const newExperience = { employerName: '', roleName: '', description: '', startDate: '', endDate: '' };
    setEditedProfile({
      ...editedProfile,
      experiences: [...editedProfile.experiences, newExperience],
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...editedProfile.experiences];
    updatedExperiences[index][field] = value;
    setEditedProfile({ ...editedProfile, experiences: updatedExperiences });
  };

  const removeExperience = (index) => {
    const updatedExperiences = editedProfile.experiences.filter((_, i) => i !== index);
    setEditedProfile({ ...editedProfile, experiences: updatedExperiences });
  };

  const handleGoBack = () => {
    navigate('/home');
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <AppLayout title="Profile"> {/* Wrap the content in AppLayout */}
    <div style={{ maxWidth: 800, margin: 'auto', padding: '16px' }}>
      
      <Card style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#fff8e1', borderRadius: '12px' }}>
        <Typography variant="h5" style={{ color: '#666', marginBottom: '8px' }}>
          {isEditing ? (
            <TextField
              label="Name"
              name="name"
              value={editedProfile.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              style={{ marginBottom: '12px' }}
            />
          ) : (
            `Name: ${profile.name}`
          )}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '12px' }}>
          {isEditing ? (
            <TextField
              label="Email"
              name="email"
              value={editedProfile.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          ) : (
            `Email: ${profile.email}`
          )}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '12px' }}>
          {isEditing ? (
            <TextField
              label="Phone"
              name="phone"
              value={editedProfile.phone}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          ) : (
            `Phone: ${profile.phone}`
          )}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '12px' }}>
          {isEditing ? (
            <TextField
              label="LinkedIn"
              name="linkedin"
              value={editedProfile.linkedin}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          ) : (
            `LinkedIn: ${profile.linkedin}`
          )}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '12px' }}>
          {isEditing ? (
            <TextField
              label="Skills"
              name="skills"
              value={editedProfile.skills.join(', ')}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, skills: e.target.value.split(', ') })
              }
              fullWidth
              variant="outlined"
            />
          ) : (
            `Skills: ${profile.skills.join(', ')}`
          )}
        </Typography>
        
        {isEditing && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button
              startIcon={<Save />}
              onClick={handleSave}
              variant="contained"
              style={{ backgroundColor: '#ffc107', color: '#333', marginRight: '8px' }}
            >
              Save
            </Button>
            <Button
              startIcon={<Cancel />}
              onClick={handleEditToggle}
              variant="outlined"
              style={{ borderColor: '#ffc107', color: '#333' }}
            >
              Cancel
            </Button>
          </div>
        )}
      </Card>

      <Card style={{ padding: '16px', backgroundColor: '#fff8e1', borderRadius: '12px' }}>
        <Typography variant="h5" style={{ marginBottom: '12px', color: '#666' }}>
          Experiences
        </Typography>
        {editedProfile.experiences.map((exp, index) => (
          <Card
            key={index}
            style={{ padding: '16px', marginBottom: '12px', backgroundColor: '#fff', borderRadius: '8px' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {isEditing ? (
                  <TextField
                    label="Employer"
                    value={exp.employerName}
                    onChange={(e) => handleExperienceChange(index, 'employerName', e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                ) : (
                  <Typography>Employer: {exp.employerName}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {isEditing ? (
                  <TextField
                    label="Role"
                    value={exp.roleName}
                    onChange={(e) => handleExperienceChange(index, 'roleName', e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                ) : (
                  <Typography>Role: {exp.roleName}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {isEditing ? (
                  <TextField
                    label="Description"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                ) : (
                  <Typography>Description: {exp.description}</Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {isEditing ? (
                  <TextField
                    label="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                ) : (
                  <Typography>Start Date: {exp.startDate}</Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {isEditing ? (
                  <TextField
                    label="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                ) : (
                  <Typography>End Date: {exp.endDate}</Typography>
                )}
              </Grid>
            </Grid>
            {isEditing && (
              <IconButton
                aria-label="delete experience"
                onClick={() => removeExperience(index)}
                style={{ marginTop: '8px', color: '#ff5252' }}
              >
                <Delete />
              </IconButton>
            )}
          </Card>
        ))}
        {isEditing && (
          <Button
            startIcon={<Add />}
            onClick={addExperience}
            variant="outlined"
            style={{ marginTop: '16px', borderColor: '#ffc107', color: '#333' }}
          >
            Add Experience
          </Button>
        )}
      </Card>

      {!isEditing && (
        <Button
          onClick={handleEditToggle}
          variant="contained"
          style={{ marginTop: '16px', backgroundColor: '#ffc107', color: '#333', width: '100%' }}
        >
          Edit Profile
        </Button>
      )}
    </div>
    </AppLayout>
  );
}

export default ProfileView;