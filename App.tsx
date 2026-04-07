import React from 'react';
import { useState, useEffect } from 'react';
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
import { ENDPOINTS } from './server/config/api';

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

// 1. Create a "Box" (State) to hold your posts from MongoDB
const [posts, setPosts] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(true);

// 2. The actual Fetch Function
const fetchFeed = async () => {
  try {
    setIsLoading(true);
    // Logic: Use your specific IP address here
    const response = await fetch('http://172.16.1.233:5000/posts');
    const data = await response.json();

    // Logic: Put the data from the server into our State
    setPosts(data);
  } catch (error) {
    console.error("Connection Failed:", error);
  } finally {
    setIsLoading(false);
  }
};

// 3. The "Trigger": Run fetchFeed exactly once when the screen loads
useEffect(() => {
  fetchFeed();
}, []);


const HomeScreen = () => (

  <SafeAreaView edges={['top']} style={styles.screen}>
    <LinkedInHeader />

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.feedContainer}
    >
      {/* The "Start a Post" Entry Bar */}
      <View style={styles.postTriggerContainer}>
        <Image
          source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Harsha' }}
          style={styles.userSmallAvatar}
        />
        <TouchableOpacity style={styles.fakeInputPill}>
          <Text style={styles.fakeInputText}>Start a post</Text>
        </TouchableOpacity>
      </View>

      {/* DYNAMIC LOGIC: Stamping out the posts from your database */}
      {posts.map((item) => (
        <PostCard
          key={item._id} 
          profileName={item.profileName}
          headline={item.headline}
          description={item.description}
          postImage={item.postImage}
          time={item.time}
        />
      ))}
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
  },
  postTriggerContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    // Android Shadow
    elevation: 2,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  userSmallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDD',
  },
  fakeInputPill: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#666666',
    marginLeft: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  fakeInputText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '600',
  },centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3F2EF',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#0A66C2',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: '#FFF',
    fontWeight: 'bold',
  }
});