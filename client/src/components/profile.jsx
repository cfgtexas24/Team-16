import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  useToast,
  Container,
  FormControl,
  FormLabel,
  Textarea,
  Divider,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { fetchWithAuth } from '../lib/auth';
import Header from './topbar';

function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const fetchProfile = useCallback(async () => {
    try {
      const data = await fetchWithAuth('/api/client/profile', { method: 'GET' });
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error fetching profile',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...profile.experiences];
    updatedExperiences[index][field] = value;
    setProfile({ ...profile, experiences: updatedExperiences });
  };

  const addNewExperience = () => {
    setProfile({
      ...profile,
      experiences: [
        ...profile.experiences,
        { employerName: '', roleName: '', description: '', startDate: '', endDate: '' },
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperiences = profile.experiences.filter((_, i) => i !== index);
    setProfile({ ...profile, experiences: updatedExperiences });
  };

  const handleSubmit = async () => {
    try {
      await fetchWithAuth('/api/client/editProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      setIsEditing(false);
      toast({
        title: 'Profile updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!profile) return <Text>Loading...</Text>;

  return (
    <Box bg="gray.100" minHeight="100vh">
      <Header />
      <Container maxW="container.md" py={8}>
        <VStack spacing={6} align="stretch" bg="white" p={6} borderRadius="md" boxShadow="md">
          <Heading size="xl" color="yellow.500">Profile View</Heading>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={profile.name || ''}
              onChange={(e) => handleInputChange(e, 'name')}
              isReadOnly={!isEditing}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={profile.email || ''}
              onChange={(e) => handleInputChange(e, 'email')}
              isReadOnly={!isEditing}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone #</FormLabel>
            <Input
              value={profile.phone || ''}
              onChange={(e) => handleInputChange(e, 'phone')}
              isReadOnly={!isEditing}
            />
          </FormControl>
          <Divider />
          <Heading size="md" color="yellow.500">Experiences</Heading>
          {profile.experiences && profile.experiences.map((exp, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="md">
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Employer Name</FormLabel>
                  <Input
                    value={exp.employerName || ''}
                    onChange={(e) => handleExperienceChange(index, 'employerName', e.target.value)}
                    isReadOnly={!isEditing}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role Name</FormLabel>
                  <Input
                    value={exp.roleName || ''}
                    onChange={(e) => handleExperienceChange(index, 'roleName', e.target.value)}
                    isReadOnly={!isEditing}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={exp.description || ''}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    isReadOnly={!isEditing}
                  />
                </FormControl>
                <HStack>
                  <FormControl>
                    <FormLabel>Start Date</FormLabel>
                    <Input
                      type="date"
                      value={exp.startDate || ''}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      isReadOnly={!isEditing}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>End Date</FormLabel>
                    <Input
                      type="date"
                      value={exp.endDate || ''}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      isReadOnly={!isEditing}
                    />
                  </FormControl>
                </HStack>
                {isEditing && (
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => removeExperience(index)}
                    colorScheme="red"
                    aria-label="Remove experience"
                  />
                )}
              </VStack>
            </Box>
          ))}
          {isEditing && (
            <Button leftIcon={<AddIcon />} onClick={addNewExperience} colorScheme="yellow">
              Add New Experience
            </Button>
          )}
          <HStack justify="space-between">
            {isEditing ? (
              <>
                <Button onClick={handleSubmit} colorScheme="yellow">Save Changes</Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} colorScheme="yellow">Edit Profile</Button>
            )}
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}

export default ProfileView;
