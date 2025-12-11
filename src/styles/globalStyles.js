import { StyleSheet, Platform } from 'react-native';
import Colors from '../constants/Colors';

// Platform-specific shadow helper
const getShadowStyles = () => {
  if (Platform.OS === 'web') {
    return {
      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    };
  } else if (Platform.OS === 'ios') {
    return {
      shadowColor: Colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    };
  } else {
    return {
      elevation: 3,
    };
  }
};

// Create shadow style
const shadowStyle = getShadowStyles();

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  card: {
    backgroundColor: Colors.white,
    color: Colors.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...shadowStyle,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 20,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Platform-specific shadow utility (use with spread operator: ...globalStyles.shadow)
  shadow: shadowStyle,
});

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  body: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  bodySmall: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};