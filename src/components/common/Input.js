import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const Input = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={Colors.gray}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: Colors.textPrimary,
    fontWeight: '500',
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
  inputError: {
    borderColor: Colors.danger,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 5,
  },
});

export default Input;