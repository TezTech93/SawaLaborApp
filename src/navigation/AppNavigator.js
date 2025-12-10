import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { AuthContext } from '../context/AuthContext';

const AppNavigator = () => {
  const { userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {userToken ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;