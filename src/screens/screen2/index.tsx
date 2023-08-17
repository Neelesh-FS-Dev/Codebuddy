/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import Button from '../../components/button';
import {useNavigation, useRoute} from '@react-navigation/native';

const Screen2 = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const {emailId, password} = route.params;

  const validateFirstName = value => value && !/^[A-Za-z]{2,50}$/.test(value);
  const validateLastName = value => value && !/^[A-Za-z]+$/.test(value);
  const validateAddress = value => value && value.length < 10;

  const handleValidation = () => {
    setFirstName('');
    setLastName('');
    setAddress('');

    if (validateFirstName(firstName)) {
      setIsFormComplete(true);
      return;
    }

    if (validateLastName(lastName)) {
      setIsFormComplete(true);
      return;
    }

    if (validateAddress(address)) {
      setIsFormComplete(true);
      return;
    }

    setIsFormComplete(false);
    setFirstName('');
    setLastName('');
    setAddress('');
  };

  return (
    <View style={{margin: 20, gap: 20, marginTop: 150}}>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 20,
          paddingHorizontal: 10,
          padding: 10,
        }}>
        <TextInput
          value={firstName}
          placeholder="Enter First Name"
          placeholderTextColor={'#000'}
          onChangeText={text => setFirstName(text)}
          style={{color: '#000', fontSize: 15}}
        />
        {isFormComplete && validateFirstName(firstName) && (
          <Text style={{color: 'red', fontSize: 12}}>
            First Name must contain only alphabets and be between 2 and 50
            characters.
          </Text>
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
          value={lastName}
          placeholder="Enter Last Name"
          placeholderTextColor={'#000'}
          onChangeText={text => setLastName(text)}
          style={{color: '#000', fontSize: 15}}
        />
        {isFormComplete && validateLastName(lastName) && (
          <Text style={{color: 'red', fontSize: 12}}>
            Last Name must contain only alphabets.
          </Text>
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
          value={address}
          multiline
          numberOfLines={3}
          placeholder="Enter Address"
          placeholderTextColor={'#000'}
          onChangeText={text => setAddress(text)}
          style={{color: '#000', fontSize: 15}}
        />
        {isFormComplete && validateAddress(address) && (
          <Text style={{color: 'red', fontSize: 12}}>
            Address must be at least 10 characters long.
          </Text>
        )}
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          variant="primary"
          title="Back"
          onPress={() => {}}
          disabled={true}
        />
        <Button
          variant="secondary"
          title="Save"
          onPress={handleValidation}
          disabled={isFormComplete}
        />
        <Button
          variant="primary"
          title="Save and Next"
          onPress={() => {
            handleValidation();
            if (isFormComplete) {
              navigation.navigate('Screen3', {
                emailId: route.params.emailId,
                password: route.params.password,
                firstName: firstName,
                lastName: lastName,
                address: address,
              });
            }
          }}
          disabled={!isFormComplete}
        />
      </View>
    </View>
  );
};

export default Screen2;
