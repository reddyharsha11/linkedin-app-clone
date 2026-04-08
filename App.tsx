import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Imports
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen'; // NEW

// Placeholders
const NetworkScreen = () => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Network</Text></View>;
const PostScreen = () => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Post</Text></View>;
const NotificationsScreen = () => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Notifications</Text></View>;
const JobsScreen = () => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Jobs</Text></View>;

const Tab = createBottomTabNavigator();

export default function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.error('Failed to check token');
      } finally {
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F2EF' }}>
        <ActivityIndicator size="large" color="#0A66C2" />
      </View>
    );
  }

  if (userToken == null) {
    return <AuthScreen onLogin={(token) => setUserToken(token)} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#666',
            headerShown: false,
            tabBarStyle: { height: 65, paddingBottom: 10 },
          }}
        >
          {/* Home Screen (No longer handles logout directly) */}
          <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} /> }} />
          <Tab.Screen name="Network" component={NetworkScreen} options={{ tabBarIcon: ({color}) => <Ionicons name="people" size={24} color={color} /> }} />
          <Tab.Screen name="Post" component={PostScreen} options={{ tabBarIcon: ({color}) => <Ionicons name="add-circle" size={24} color={color} /> }} />
          <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ tabBarIcon: ({color}) => <Ionicons name="notifications" size={24} color={color} /> }} />
          <Tab.Screen name="Jobs" component={JobsScreen} options={{ tabBarIcon: ({color}) => <Ionicons name="briefcase" size={24} color={color} /> }} />
          
          {/* NEW: Profile Screen (Hidden from bottom bar) */}
          <Tab.Screen 
            name="Profile" 
            options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
          >
            {(props) => <ProfileScreen {...props} onLogout={() => setUserToken(null)} />}
          </Tab.Screen>

        </Tab.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}