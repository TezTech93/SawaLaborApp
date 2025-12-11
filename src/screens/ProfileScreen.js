import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Changed import for Expo
import Colors from '../constants/Colors';
import Logo from '../components/Logo';
import { globalStyles } from '../styles/globalStyles';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { userInfo, logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', screen: 'EditProfile' },
    { icon: 'wallet-outline', label: 'Payment Methods', screen: 'PaymentMethods' },
    { icon: 'document-text-outline', label: 'My Jobs', screen: 'MyJobs' },
    { icon: 'star-outline', label: 'Reviews & Ratings', screen: 'Reviews' },
    { icon: 'shield-checkmark-outline', label: 'Privacy & Security', screen: 'Privacy' },
    { icon: 'help-circle-outline', label: 'Help & Support', screen: 'Support' },
    { icon: 'information-circle-outline', label: 'About DurbanWork', screen: 'About' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header with Back Button */}
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.topHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>My Profile</Text>
          <View style={styles.rightPlaceholder} />
        </View>
      </SafeAreaView>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <Logo size={80} showText={false} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {userInfo?.name || 'John Doe'}
            </Text>
            <Text style={styles.userEmail}>
              {userInfo?.email || 'user@example.com'}
            </Text>
            <Text style={styles.userType}>
              {userInfo?.user_type === 'worker' ? 'Worker' : 'Client'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Ionicons name="create-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {userInfo?.user_type === 'worker' ? '15' : '8'}
            </Text>
            <Text style={styles.statLabel}>
              {userInfo?.user_type === 'worker' ? 'Jobs Done' : 'Jobs Posted'}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {userInfo?.user_type === 'worker' ? 'R2,500' : 'R1,200'}
            </Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={22} color={Colors.textPrimary} />
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: Colors.lightGray, true: Colors.primary + '80' }}
              thumbColor={notifications ? Colors.primary : Colors.white}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={22} color={Colors.textPrimary} />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: Colors.lightGray, true: Colors.primary + '80' }}
              thumbColor={darkMode ? Colors.primary : Colors.white}
            />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon} size={22} color={Colors.textPrimary} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color={Colors.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={Colors.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Extra Content to Ensure Scroll Works */}
        <View style={styles.spacer} />
        
        {/* App Version */}
        <Text style={styles.versionText}>DurbanWork v1.0.0</Text>
        
        {/* Extra Padding for Safe Area */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main container
  container: {
  flex: 1, 
  backgroundColor: Colors.white,
  
  ...(Platform.OS === 'web' && { 
    height: '100vh',
    overflowY: 'scroll', 
  }),
},
  // Safe area for header
  safeHeader: {
    backgroundColor: Colors.primary,
  },
  // Fixed header with back button
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  rightPlaceholder: {
    width: 40,
  },
  // ScrollView styles
  scrollContent: {
    paddingBottom: 500,
  },
  // Content styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
      }
    }),
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  userType: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    paddingVertical: 20,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
      }
    }),
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: Colors.lightGray,
    alignSelf: 'center',
  },
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
      }
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginLeft: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
      }
    }),
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.danger,
    marginLeft: 10,
  },
  spacer: {
    height: 50, // Extra space to ensure scroll
  },
  bottomSpacer: {
    height: 30, // Extra space for safe area at bottom
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textSecondary,
    marginVertical: 10,
  },
});

export default ProfileScreen;