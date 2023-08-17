import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Screen1 from './src/screens/screen1';
import Screen2 from './src/screens/screen2';
import Screen3 from './src/screens/screen3';
import {DataProvider} from './src/components/dataContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Screen1">
          <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen name="Screen2" component={Screen2} />
          <Stack.Screen name="Screen3" component={Screen3} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
