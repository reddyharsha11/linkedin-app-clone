import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform, ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PostCard, { PostcardProps } from './components/Postcard';

const LinkedInHeader = () => {
  return (
    <View style={styles.headerContainer}>
      {/* 1. Profile Avatar */}
      <TouchableOpacity activeOpacity={0.7}>
        <Image
          source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Harsha' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* 2. Search Bar Section */}
      <View style={styles.searchSection}>
        <Ionicons name="search" size={18} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
        <TouchableOpacity>
          <Ionicons name="qr-code-outline" size={18} color="#666" />
        </TouchableOpacity>
      </View>

      {/* 3. Messaging Icon */}
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons name="chatbubble-ellipses" size={26} color="#666" />
      </TouchableOpacity>
    </View>
  );
};


const HomeScreen = () => (
  
  <SafeAreaView edges={['top']} style={styles.screen}>
    <LinkedInHeader />
    
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={styles.feedContainer}
    >
      {/* Post 1: Personal Update */}
      <PostCard 
        profileName="B Harshavardhan Reddy"
        headline="Software Developer Intern @ NxtWave | BITS Pilani"
        description="Just finished building the feed architecture for my LinkedIn clone! Loving how React Native handles reusable components. 🚀 #ReactNative #Coding"
        postImage="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
        time="Just now"
      />

      {/* Post 2: Tech News */}
      <PostCard 
        profileName="Tech Insights"
        headline="Daily Tech Updates"
        description="The future of mobile development is looking bright with the new architecture updates in React Native. What are your thoughts? 📱"
        postImage="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
        time="2h"
      />
    </ScrollView>
  </SafeAreaView>
);


const NetworkScreen = () => <View style={styles.screen}><Text>My Network</Text></View>;
const PostScreen = () => <View style={styles.screen}><Text>Create Post</Text></View>;
const NotificationsScreen = () => <View style={styles.screen}><Text>Notifications</Text></View>;
const JobsScreen = () => <View style={styles.screen}><Text>Jobs</Text></View>;


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'home';

              if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
              else if (route.name === 'Network') iconName = focused ? 'people' : 'people-outline';
              else if (route.name === 'Post') iconName = focused ? 'add-circle' : 'add-circle-outline';
              else if (route.name === 'Notifications') iconName = focused ? 'notifications' : 'notifications-outline';
              else if (route.name === 'Jobs') iconName = focused ? 'briefcase' : 'briefcase-outline';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#000000',
            tabBarInactiveTintColor: '#666666',
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              height: Platform.OS === 'ios' ? 85 : 65,
              paddingBottom: Platform.OS === 'ios' ? 25 : 10,
              borderTopWidth: 1,
              borderTopColor: '#E0E0E0'
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Network" component={NetworkScreen} />
          <Tab.Screen name="Post" component={PostScreen} />
          <Tab.Screen name="Notifications" component={NotificationsScreen} />
          <Tab.Screen name="Jobs" component={JobsScreen} />
        </Tab.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F2EF', // LinkedIn background grey
  },
  feedContainer: {
    paddingBottom: 20, // Extra space at the bottom so the last post isn't hidden by the tabs
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: 12,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    width: '100%',
    // Adding subtle shadow for the header
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  profileImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#DDD',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF3F8',
    marginHorizontal: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 15,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  }
});