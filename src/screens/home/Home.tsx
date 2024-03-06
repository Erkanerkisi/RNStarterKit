/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext.tsx';
import {UserRepository} from '../../domain/auth/UserRepository.tsx';
import FirebaseUserImpl from '../../infrastructure/auth/FirebaseUserImpl.tsx';

function Home(): React.JSX.Element {
  const authCtx = useContext(AuthContext);
  const userRepository: UserRepository = new FirebaseUserImpl();

  return (
    <View style={styles.sectionContainer}>
      <Text>{authCtx?.user?.displayName}</Text>
      <Text>{authCtx?.user?.email}</Text>
      <Text>{authCtx?.user?.uid}</Text>
      <Button
        title="Logout"
        onPress={() => {
          userRepository.logout().then(() => {
            authCtx?.setUser(undefined);
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
