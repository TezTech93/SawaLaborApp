// App.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
// Import Platform to check environment
import { Platform } from 'react-native'; 

const App = () => {
  // Define a style object for the web platform to force full height
  const webStyle = Platform.OS === 'web' ? { height: '100vh', flex: 1 , overflowY: 'scroll'} : { flex: 1 };

  return (
    // Apply the full-height style to the outermost container
    <SafeAreaProvider style={webStyle}> 
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;