import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import MapScreen from "./Screens/MapScreen";


const App = () => {
  return (
    <SafeAreaView style={{flex : 1}}>
      <StatusBar barStyle={'dark-content'} />
      <MapScreen />
    </SafeAreaView>
  );
};


export default App;
