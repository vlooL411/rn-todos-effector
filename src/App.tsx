import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RecoilRoot} from 'recoil';
import AppNavigation from './AppNavigation';

const App = () => {
  return (
    <RecoilRoot>
      <SafeAreaView style={styles.container}>
        <AppNavigation />
      </SafeAreaView>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
});

export default App;
