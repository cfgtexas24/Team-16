import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ProfileView = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch profile data from the backend
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Rebirth Empowerment" className="h-8 mr-2" />
          <h2 className="text-xl font-bold">REBIRTH EMPOWERMENT</h2>
        </div>
        <X className="cursor-pointer" />
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Name</h3>
          <p className="bg-gray-100 p-2 rounded">{profileData.name}</p>
        </div>
        <div>
          <h3 className="font-semibold">Email</h3>
          <p className="bg-gray-100 p-2 rounded">{profileData.email}</p>
        </div>
        <div>
          <h3 className="font-semibold">Phone #</h3>
          <p className="bg-gray-100 p-2 rounded">{profileData.phone}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Experiences</h3>
          {profileData.experiences.map((exp, index) => (
            <div key={index} className="mb-4 bg-gray-100 p-2 rounded">
              <p><strong>Employer Name:</strong> {exp.employerName}</p>
              <p><strong>Role Name:</strong> {exp.roleName}</p>
              <p><strong>Description:</strong> {exp.description}</p>
              <p><strong>Start Date:</strong> {exp.startDate}</p>
              <p><strong>End Date:</strong> {exp.endDate}</p>
            </div>
          ))}
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add New Experience
        </button>
      </div>
    </div>
  );
};

export default ProfileView;