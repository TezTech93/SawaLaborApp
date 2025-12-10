import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Base URL for your FastAPI backend (update when you create it)
  const BASE_URL = 'http://localhost:8000'; // Change to your server URL

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      
      const { token, user } = response.data;
      
      // Store token and user info
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      
      setUserToken(token);
      setUserInfo(user);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, userData);
      
      const { token, user } = response.data;
      
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      
      setUserToken(token);
      setUserInfo(user);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
    } catch (error) {
      console.log('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      
      setUserToken(null);
      setUserInfo(null);
      
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const userInfoString = await AsyncStorage.getItem('userInfo');
      
      if (token && userInfoString) {
        setUserToken(token);
        setUserInfo(JSON.parse(userInfoString));
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('isLoggedIn error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};