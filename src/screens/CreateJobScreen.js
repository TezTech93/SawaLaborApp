import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Colors from '../constants/Colors';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const JobSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  job_type: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  budget: Yup.number().required('Required').positive('Must be positive'),
  estimated_hours: Yup.number().required('Required').positive('Must be positive'),
});

const CreateJobScreen = ({ navigation }) => {
  const handleCreateJob = async (values) => {
    // API call to create job
    console.log(values);
    // After successful creation, navigate back
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Create a New Job</Text>
          <Formik
            initialValues={{
              title: '',
              description: '',
              job_type: '',
              location: '',
              budget: '',
              estimated_hours: '',
            }}
            validationSchema={JobSchema}
            onSubmit={handleCreateJob}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                <Input
                  label="Job Title"
                  placeholder="e.g., Apartment Move"
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  error={touched.title && errors.title}
                />

                <Input
                  label="Description"
                  placeholder="Describe the job in detail"
                  multiline
                  numberOfLines={4}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  error={touched.description && errors.description}
                />

                <Input
                  label="Job Type"
                  placeholder="e.g., Moving, Landscaping, Heavy Lifting"
                  onChangeText={handleChange('job_type')}
                  onBlur={handleBlur('job_type')}
                  value={values.job_type}
                  error={touched.job_type && errors.job_type}
                />

                <Input
                  label="Location"
                  placeholder="Where is the job located?"
                  onChangeText={handleChange('location')}
                  onBlur={handleBlur('location')}
                  value={values.location}
                  error={touched.location && errors.location}
                />

                <Input
                  label="Budget ($)"
                  placeholder="Estimated budget"
                  keyboardType="numeric"
                  onChangeText={handleChange('budget')}
                  onBlur={handleBlur('budget')}
                  value={values.budget}
                  error={touched.budget && errors.budget}
                />

                <Input
                  label="Estimated Hours"
                  placeholder="How many hours will it take?"
                  keyboardType="numeric"
                  onChangeText={handleChange('estimated_hours')}
                  onBlur={handleBlur('estimated_hours')}
                  value={values.estimated_hours}
                  error={touched.estimated_hours && errors.estimated_hours}
                />

                <Button
                  title="Post Job"
                  onPress={handleSubmit}
                  style={styles.submitButton}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  submitButton: {
    marginTop: 20,
  },
});

export default CreateJobScreen;