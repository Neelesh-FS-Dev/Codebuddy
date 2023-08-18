import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {useDataContext} from '../../components/dataContext';

const Screen1 = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();
  const {setScreen1Data} = useDataContext();
  const [isSaved, setIsSaved] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = pass => {
    const passwordRegex =
      /^(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,})(?=(.*\d){2,})(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){2,}).{8,}$/;
    return passwordRegex.test(pass);
  };

  const handleSave = () => {
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!validateEmail(emailId)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must contain 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 special characters.',
      );
      isValid = false;
    }

    if (isValid) {
      console.log('Data saved:', {emailId, password});
      setIsSaved(true);
    }
  };

  const handleNext = () => {
    if (isSaved) {
      setScreen1Data({
        emailId,
        password,
      });

      navigation.navigate('Screen2');
    } else {
      console.log('Save data before proceeding to the next screen.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={emailId}
          placeholder="Enter email..."
          placeholderTextColor="#000"
          onChangeText={text => setEmailId(text)}
          keyboardType="email-address"
          style={styles.input}
        />
        {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#000"
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        {!!passwordError && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button variant="secondary" title="Save" onPress={handleSave} />
        <Button variant="primary" title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    gap: 20,
    marginTop: 250,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    padding: 10,
  },
  input: {
    color: '#000',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Screen1;
