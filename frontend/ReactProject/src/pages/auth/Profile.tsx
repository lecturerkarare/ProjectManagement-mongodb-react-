import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import axiosHttp from '../../utils/setAuthToken';
import { jwtDecode } from 'jwt-decode';


interface DecodedToken {
  user_id: string;
  roles: string[];
  exp: number;
  iat: number;
}

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
     console.log(decoded,'dd')
        setUserId(decoded?.user_id);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUser = async (id: string) => {
      try {
        const { data } = await axiosHttp.get(`/user/${id}`);
        const user = data.result; // Adjust based on your API response shape
        setFormData({
          firstname: user.firstname || '',
          lastname: user.lastname || '',
          email: user.email || '',
        });
      } catch (error) {
        toast.error('Failed to fetch user profile');
        console.error(error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const id = decoded?.user_id;
        setUserId(id);
        if (id) fetchUser(id);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);



  const handleCreateUser = async () => {
    if (!userId) return;
    try {
      await axiosHttp.patch(`/user/${userId}`, formData);
      toast.success('User updated successfully');
    } catch (err) {
      toast.error('Failed to update user');
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded ">
      <div className="flex justify-center mb-6">
        <Avatar
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          sx={{ width: 96, height: 96, border: '2px solid #D1D5DB' }}
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateUser();
        }}
      >
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter first name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter last name"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter email"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
