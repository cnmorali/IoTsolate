import React, {useState, useEffect} from 'react';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/signedIn/Home';
import Profile from './screens/signedIn/Profile';
import History from './screens/signedIn/History';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [isSignedIn,setIsSignedIn] = useState(false);

  useEffect(()=>{

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSignedIn(true);
      //const uid = user.uid;
    } else {
      setIsSignedIn(false);
    }
    });

  },[])

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'History'){
              iconName = focused ? 'list-circle' : 'list-circle-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#333a5b',
          tabBarInactiveTintColor: '#6471a9',
        })}
        >

          <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Tab.Screen name="History" component={History} options={{ headerShown: false }}/>
          <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="signIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="signUp" component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};


export default App;