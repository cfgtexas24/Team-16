import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2 } from 'lucide-react';
import Header from './topbar';

const ProfileView = () => {
  const [profileData, setProfileData] = useState(null);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [newExperience, setNewExperience] = useState({
    employerName: '',
    roleName: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    // Fetch profile data from the backend
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

  const handleAddExperience = async () => {
    try {
      const response = await fetch('/api/profile/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExperience),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfileData(updatedProfile);
        setIsAddingExperience(false);
        setNewExperience({
          employerName: '',
          roleName: '',
          description: '',
          startDate: '',
          endDate: ''
        });
      } else {
        console.error('Failed to add experience');
      }
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  if (!profileData) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
            <button className="text-gray-600 hover:text-gray-800">
              <Edit2 size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ProfileField label="Name" value={profileData.name} />
            <ProfileField label="Email" value={profileData.email} />
            <ProfileField label="Phone #" value={profileData.phone} />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Experiences</h3>
            <div className="space-y-4">
              {profileData.experiences.map((exp, index) => (
                <ExperienceCard key={index} experience={exp} />
              ))}
            </div>

            {isAddingExperience ? (
              <div className="mt-4 p-4 border border-yellow-500 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Add New Experience</h4>
                <input
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Employer Name"
                  value={newExperience.employerName}
                  onChange={(e) => setNewExperience({...newExperience, employerName: e.target.value})}
                />
                <input
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Role Name"
                  value={newExperience.roleName}
                  onChange={(e) => setNewExperience({...newExperience, roleName: e.target.value})}
                />
                <textarea
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Description"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                />
                <input
                  className="w-full p-2 mb-2 border rounded"
                  type="date"
                  placeholder="Start Date"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                />
                <input
                  className="w-full p-2 mb-2 border rounded"
                  type="date"
                  placeholder="End Date"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
                    onClick={() => setIsAddingExperience(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                    onClick={handleAddExperience}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="mt-4 flex items-center bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                onClick={() => setIsAddingExperience(true)}
              >
                <Plus size={20} className="mr-2" />
                Add New Experience
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold text-gray-700 mb-1">{label}</h3>
    <p className="text-gray-900">{value}</p>
  </div>
);

const ExperienceCard = ({ experience }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="font-semibold text-lg mb-2">{experience.roleName} at {experience.employerName}</h4>
    <p className="text-gray-700 mb-2">{experience.description}</p>
    <p className="text-sm text-gray-600">
      {new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}
    </p>
  </div>
);

export default ProfileView;
