import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import Colors from '../constants/Colors';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../../assets/images/african-pattern-bg.jpg')} // Add your own background image
      style={styles.background}
      blurRadius={2}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo size={150} />
          <Text style={styles.title}>DurbanWork</Text>
          <Text style={styles.subtitle}>Connecting Labor with Opportunity</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Register</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={() => navigation.navigate('WorkerRegister')}
          >
            <Text style={styles.outlineButtonText}>Register as Worker</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>By continuing, you agree to our</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: Colors.white,
  },
  outlineButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  dividerText: {
    marginHorizontal: 10,
    color: Colors.textSecondary,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  linkText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default WelcomeScreen;