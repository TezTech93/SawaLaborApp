import React, { useContext } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const { userInfo, logout } = useContext(AuthContext);

  const isWorker = userInfo?.user_type === 'worker';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{userInfo?.name}</Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <Icon name="log-out-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {isWorker ? (
          <View>
            <Text style={styles.sectionTitle}>Available Jobs</Text>
            {/* List of available jobs for workers */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('JobList')}
            >
              <Text style={styles.cardTitle}>View Available Jobs</Text>
              <Text style={styles.cardText}>Check out new job postings in your area</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Post a Job</Text>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('CreateJob')}
            >
              <Icon name="add-circle-outline" size={40} color={Colors.primary} />
              <Text style={styles.cardTitle}>Create New Job</Text>
              <Text style={styles.cardText}>Find workers for your tasks</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  card: {
    backgroundColor: Colors.bgGold,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 10,
  },
  cardText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default HomeScreen;