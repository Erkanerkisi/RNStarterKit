/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext} from 'react';
import Home from '../screens/home/Home.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/auth/Login.tsx';
import {AuthContext} from '../contexts/AuthContext.tsx';

const Stack = createNativeStackNavigator();

function AppStackNav(): React.JSX.Element {
  const authCtx = useContext(AuthContext);
  const user = authCtx?.user;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={
          user !== undefined && user.uid !== '' ? 'Home' : 'Login'
        }>
        {user !== undefined && user.uid !== '' ? (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStackNav;
