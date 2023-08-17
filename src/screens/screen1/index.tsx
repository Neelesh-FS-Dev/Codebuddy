import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';

const Screen1 = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  const handleValidation = () => {
    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    const passwordRegex =
      /^(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,})(?=(.*\d){2,})(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){2,}).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 special characters.',
      );
      return;
    }

    setEmailId('');
    setPassword('');
    navigation.navigate('Screen2', {
      emailId: emailId,
      password: password,
    });
  };

  return (
    <View style={{margin: 20, gap: 20, marginTop: 250}}>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 20,
          paddingHorizontal: 10,
          padding: 10,
        }}>
        <TextInput
          value={emailId}
          placeholder="Enter email..."
          placeholderTextColor={'#000'}
          onChangeText={text => setEmailId(text)}
          keyboardType="email-address"
          style={{color: '#000', fontSize: 15}}
        />
        {!!emailError && (
          <Text style={{color: 'red', fontSize: 12}}>{emailError}</Text>
        )}
      </View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 20,
          paddingHorizontal: 10,
          padding: 10,
        }}>
        <TextInput
          value={password}
          placeholder="Enter password"
          placeholderTextColor={'#000'}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={{color: '#000', fontSize: 15}}
        />
        {!!passwordError && (
          <Text style={{color: 'red', fontSize: 12}}>{passwordError}</Text>
        )}
      </View>
      <Button variant="primary" title="Next" onPress={handleValidation} />
    </View>
  );
};

export default Screen1;
