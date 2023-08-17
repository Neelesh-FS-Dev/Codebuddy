/* eslint-disable react-native/no-inline-styles */
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import Button from '../../components/button';
import {useRoute} from '@react-navigation/native';
import {useDataContext} from '../../components/dataContext';

const Screen3 = () => {
  const {screen1Data, screen2Data} = useDataContext(); // Access context data

  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [countryCodeOptionsVisible, setCountryCodeOptionsVisible] =
    useState(false);
  const route = useRoute();
  const [errorMessage, setErrorMessage] = useState('');
  const [savedPhoneNumber, setSavedPhoneNumber] = useState('');
  const [savedCountryCode, setSavedCountryCode] = useState('');
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const handleValidation = () => {
    if (selectedCountryCode === '' || !/^\d{10}$/.test(phoneNumber)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
    } else {
      setErrorMessage('');
      setSavedPhoneNumber(phoneNumber);
      setSavedCountryCode(selectedCountryCode);
      setDetailsModalVisible(true);
    }
  };

  const countryCodeOptions = [
    {label: 'India (+91)', value: '+91'},
    {label: 'America (+1)', value: '+1'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.countryCodeDropdown}>
          <TouchableOpacity
            onPress={() => setCountryCodeOptionsVisible(true)}
            style={styles.dropdownButton}>
            <Text style={styles.dropdownLabel}>
              {selectedCountryCode || 'DD'}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.phoneNumberInput}
          placeholder="Phone Number"
          placeholderTextColor="#000"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={text => {
            if (text.length <= 10) {
              setPhoneNumber(text);
            }
          }}
          maxLength={10} // Restrict input to 10 characters
        />
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={acceptTerms}
          onValueChange={setAcceptTerms}
          tintColors={{true: '#007bff', false: '#000'}}
        />
        <Text style={styles.checkboxLabel}>
          I accept the terms and conditions
        </Text>
      </View>
      {errorMessage !== '' && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleValidation}>
        <Text style={styles.buttonText}>Check</Text>
      </TouchableOpacity>
      <Modal
        visible={detailsModalVisible}
        animationType="slide"
        onRequestClose={() => setDetailsModalVisible(false)}>
        <View style={styles.detailsModalContainer}>
          <Text style={{color: '#000', fontSize: 20}}>
            Email: {screen1Data.emailId}
          </Text>
          <Text style={{color: '#000', fontSize: 20}}>
            Password: {screen1Data.password}
          </Text>
          <Text style={{color: '#000', fontSize: 20}}>
            First Name: {screen2Data.firstName}
          </Text>
          <Text style={{color: '#000', fontSize: 20}}>
            Last Name: {screen2Data.lastName}
          </Text>
          <Text style={{color: '#000', fontSize: 20}}>
            Address: {screen2Data.address}
          </Text>
          <Text style={{color: '#000', fontSize: 20}}>
            Country Code: {countryCode}
          </Text>
          <Text style={{color: '#000', fontSize: 20}}>
            Phone Number: {phoneNumber}
          </Text>
          <Button
            variant="primary"
            title="Close"
            onPress={() => setDetailsModalVisible(false)}
            style={{marginTop: 50}}
          />
        </View>
      </Modal>
      <Modal
        visible={countryCodeOptionsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCountryCodeOptionsVisible(false)}>
        <View style={styles.dropdownContainer}>
          {countryCodeOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.dropdownOption}
              onPress={() => {
                setSelectedCountryCode(option.value);
                setCountryCode(option.value);
                setCountryCodeOptionsVisible(false);
              }}>
              <Text style={{color: '#000'}}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 150,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
  countryCodeDropdown: {},
  phoneNumberInput: {
    flex: 2,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#000',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  detailsModalContainer: {
    backgroundColor: '#fff',
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Screen3;
