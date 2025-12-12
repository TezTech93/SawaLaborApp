import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { globalStyles } from '../../styles/globalStyles';

const JobDetailScreen = ({ route, navigation }) => {
  // Sample job data - in real app, this would come from route.params
  const job = route?.params?.job || {
    id: '1',
    title: 'Apartment Moving Assistance',
    description: 'Need help moving furniture from 2-bedroom apartment to new location. Heavy lifting required for sofa, bed, and refrigerator.',
    clientName: 'John Smith',
    clientRating: 4.8,
    jobType: 'Moving',
    location: 'Durban Central, 4001',
    scheduledDate: '2024-02-15T09:00:00',
    estimatedHours: 4,
    budget: 800,
    status: 'available', // available, assigned, in_progress, completed
    createdAt: '2024-02-10T14:30:00',
    requiredWorkers: 2,
    specialRequirements: 'Must be able to lift heavy items. Own transportation preferred.',
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleApplyJob = () => {
    Alert.alert(
      'Apply for Job',
      'Are you sure you want to apply for this job?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Apply', 
          onPress: () => {
            // API call to apply for job
            Alert.alert('Success', 'Application submitted successfully!');
          },
          style: 'default'
        },
      ]
    );
  };

  const handleAcceptJob = () => {
    Alert.alert(
      'Accept Job',
      'Accept this job offer?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Accept', 
          onPress: () => {
            // API call to accept job
            Alert.alert('Success', 'Job accepted!');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Job Status Badge */}
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: job.status === 'available' ? Colors.success + '20' : Colors.warning + '20' }
          ]}>
            <Text style={[
              styles.statusText,
              { color: job.status === 'available' ? Colors.success : Colors.warning }
            ]}>
              {job.status === 'available' ? 'AVAILABLE' : 'ASSIGNED'}
            </Text>
          </View>
          <Text style={styles.jobBudget}>R{job.budget}</Text>
        </View>

        {/* Job Title */}
        <Text style={styles.jobTitle}>{job.title}</Text>

        {/* Job Type and Location */}
        <View style={styles.jobMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="briefcase-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{job.jobType}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{job.location}</Text>
          </View>
        </View>

        {/* Client Info */}
        <View style={styles.clientCard}>
          <View style={styles.clientInfo}>
            <View style={styles.clientAvatar}>
              <Text style={styles.clientInitials}>
                {job.clientName.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.clientDetails}>
              <Text style={styles.clientName}>{job.clientName}</Text>
              <View style={styles.clientRating}>
                <Ionicons name="star" size={16} color={Colors.warning} />
                <Text style={styles.ratingText}>{job.clientRating}</Text>
                <Text style={styles.reviewsText}>(42 reviews)</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.messageButton}>
            <Ionicons name="chatbubble-outline" size={20} color={Colors.primary} />
            <Text style={styles.messageText}>Message</Text>
          </TouchableOpacity>
        </View>

        {/* Job Details Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{job.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Details</Text>
          <View style={styles.detailGrid}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={22} color={Colors.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Scheduled For</Text>
                <Text style={styles.detailValue}>{formatDate(job.scheduledDate)}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={22} color={Colors.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Estimated Time</Text>
                <Text style={styles.detailValue}>{job.estimatedHours} hours</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={22} color={Colors.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Workers Needed</Text>
                <Text style={styles.detailValue}>{job.requiredWorkers} workers</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="alert-circle-outline" size={22} color={Colors.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValue}>{job.status.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Requirements */}
        {job.specialRequirements && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            <View style={styles.requirementsList}>
              {job.specialRequirements.split('. ').map((req, index) => (
                req.trim() && (
                  <View key={index} style={styles.requirementItem}>
                    <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
                    <Text style={styles.requirementText}>{req.trim()}</Text>
                  </View>
                )
              ))}
            </View>
          </View>
        )}

        {/* Spacer */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        {job.status === 'available' ? (
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyJob}>
            <Ionicons name="checkmark-circle-outline" size={22} color={Colors.white} />
            <Text style={styles.applyButtonText}>Apply for Job</Text>
          </TouchableOpacity>
        ) : job.status === 'assigned' ? (
          <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptJob}>
            <Ionicons name="checkmark-done-outline" size={22} color={Colors.white} />
            <Text style={styles.acceptButtonText}>Accept Job Offer</Text>
          </TouchableOpacity>
        ) : null}
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    ...globalStyles.shadow,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  rightPlaceholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobBudget: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  jobMeta: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  clientCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clientInitials: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  clientRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 12,
    color: Colors.gray,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.primary + '10',
    borderRadius: 8,
  },
  messageText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 3px rgba(0,0,0,0.05)',
      }
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '48%',
    marginBottom: 20,
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  requirementsList: {
    marginTop: 5,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  requirementText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  spacer: {
    height: 30,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  acceptButton: {
    backgroundColor: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  acceptButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default JobDetailScreen;