import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {useDataContext} from '../../components/dataContext'; // Import your context

const Screen2 = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const navigation = useNavigation();
  const {setScreen2Data} = useDataContext();

  const validateFirstName = value => value && !/^[A-Za-z]{2,50}$/.test(value);
  const validateLastName = value => value && !/^[A-Za-z]+$/.test(value);
  const validateAddress = value => value && value.length < 10;

  const handleValidation = () => {
    if (
      validateFirstName(firstName) ||
      validateLastName(lastName) ||
      validateAddress(address)
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
      setScreen2Data({
        firstName,
        lastName,
        address,
      });
      if (isFormComplete) {
        navigation.navigate('Screen3');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={firstName}
          placeholder="Enter First Name"
          placeholderTextColor="#000"
          onChangeText={text => setFirstName(text)}
          style={styles.input}
        />
        {isFormComplete && validateFirstName(firstName) && (
          <Text style={styles.errorText}>
            First Name must contain only alphabets and be between 2 and 50
            characters.
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={lastName}
          placeholder="Enter Last Name"
          placeholderTextColor="#000"
          onChangeText={text => setLastName(text)}
          style={styles.input}
        />
        {isFormComplete && validateLastName(lastName) && (
          <Text style={styles.errorText}>
            Last Name must contain only alphabets.
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={address}
          multiline
          numberOfLines={3}
          placeholder="Enter Address"
          placeholderTextColor="#000"
          onChangeText={text => setAddress(text)}
          style={styles.input}
        />
        {isFormComplete && validateAddress(address) && (
          <Text style={styles.errorText}>
            Address must be at least 10 characters long.
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          title="Back"
          onPress={() => navigation.goBack()}
          disabled={false}
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
          onPress={handleValidation}
          disabled={!isFormComplete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    gap: 20,
    marginTop: 150,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    padding: 10,
    marginBottom: 10,
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
  },
});

export default Screen2;
