import axios from 'axios';

// Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') !== null;
  }
  return false;
};

// Get user data from token
export const getUserData = async () => {
  if (!isAuthenticated()) return null;
  
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/user/login-data`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // Token is invalid, remove it
    localStorage.removeItem('token');
    return null;
  }
};

// Check if user is admin (role 1)
export const isAdmin = async () => {
  const userData = await getUserData();
  return userData?.role === 1;
};

// Logout user
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};