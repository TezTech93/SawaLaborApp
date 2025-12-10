import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import JobListScreen from '../screens/JobListScreen';
import CreateJobScreen from '../screens/CreateJobScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const JobsStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'SabaLabor' }}
    />
    <HomeStack.Screen name="CreateJob" component={CreateJobScreen} />
  </HomeStack.Navigator>
);

const JobsStackNavigator = () => (
  <JobsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <JobsStack.Screen name="JobList" component={JobListScreen} />
  </JobsStack.Navigator>
);

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Jobs') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen name="Jobs" component={JobsStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;