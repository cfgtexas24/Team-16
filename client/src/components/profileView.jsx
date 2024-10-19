import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../lib/auth';
import { getDecodedToken } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const handleGoBack = () => {
    navigate('/home');
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <Card variant="outlined" sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Button onClick={handleGoBack} variant="outlined" sx={{ mb: 2 }}>
          Back to Home
        </Button>
        {isEditing ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={editedProfile.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={editedProfile.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="LinkedIn"
                name="linkedin"
                value={editedProfile.linkedin}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills (comma-separated)"
                name="skills"
                value={editedProfile.skills.join(', ')}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, skills: e.target.value.split(', ') })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={editedProfile.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Experiences
              </Typography>
              {editedProfile.experiences.map((exp, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Employer Name"
                      value={exp.employerName}
                      onChange={(e) => handleExperienceChange(index, 'employerName', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Role Name"
                      value={exp.roleName}
                      onChange={(e) => handleExperienceChange(index, 'roleName', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      variant="outlined"
                      multiline
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="End Date"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <IconButton
                      aria-label="delete experience"
                      onClick={() => removeExperience(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                startIcon={<AddCircleOutlineIcon />}
                onClick={addExperience}
                variant="outlined"
                sx={{ mt: 2 }}
              >
                Add Experience
              </Button>
            </Grid>
          </Grid>
        ) : (
          <div>
            <Typography>Email: {profile.email}</Typography>
            <Typography>Phone: {profile.phone}</Typography>
            <Typography>LinkedIn: {profile.linkedin}</Typography>
            <Typography>Skills: {profile.skills.join(', ')}</Typography>
            <Typography>Name: {profile.name}</Typography>
            <Typography variant="h6" gutterBottom>
              Experiences
            </Typography>
            {profile.experiences.map((exp, index) => (
              <Card variant="outlined" key={index} sx={{ mb: 2, p: 2 }}>
                <Typography>Employer: {exp.employerName}</Typography>
                <Typography>Role: {exp.roleName}</Typography>
                <Typography>Description: {exp.description}</Typography>
                <Typography>Start Date: {exp.startDate}</Typography>
                <Typography>End Date: {exp.endDate}</Typography>
              </Card>
            ))}
            <Button onClick={handleEdit} variant="contained" sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </div>
        )}
      </CardContent>
      {isEditing && (
        <CardActions>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default ProfileView;
