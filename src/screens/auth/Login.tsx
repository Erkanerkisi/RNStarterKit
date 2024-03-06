import React, {useContext, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../../contexts/AuthContext.tsx';
import FirebaseUserImpl from '../../infrastructure/auth/FirebaseUserImpl.tsx';
import {UserRepository} from '../../domain/auth/UserRepository.tsx';
import {webClientId} from '../../secrets/secrets.tsx';

GoogleSignin.configure({
  webClientId: webClientId,
});
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authCtx = useContext(AuthContext);
  const userRepository: UserRepository = new FirebaseUserImpl();
  const GoogleSignIn = () => {
    return (
      <Button
        title="Google Sign-In"
        onPress={() => {
          userRepository.googleSignIn().then(res => authCtx?.setUser(res));
        }}
      />
    );
  };

  const SignIn = () => {
    return (
      <Button
        title="Sign-In"
        onPress={() => {
          userRepository
            .signIn(username, password)
            .then(res => authCtx?.setUser(res));
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <SignIn />
      <GoogleSignIn />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Login;
