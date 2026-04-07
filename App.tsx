import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
  Modal
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PostCard from './components/Postcard';

/**
 * ARCHITECTURE: Header Component
 */
const LinkedInHeader = () => (
  <View style={styles.headerContainer}>
    <TouchableOpacity activeOpacity={0.7}>
      <Image
        source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Harsha' }}
        style={styles.profileImage}
      />
    </TouchableOpacity>

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

    <TouchableOpacity activeOpacity={0.7}>
      <Ionicons name="chatbubble-ellipses" size={26} color="#666" />
    </TouchableOpacity>
  </View>
);

/**
 * LOGIC & UI: Home Screen
 */
const HomeScreen = () => {
  // Logic: State for managing posts and loading
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Logic: State for Create Post Modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [postContent, setPostContent] = useState('');

  // Functionality: Fetching data from your TypeScript Express Backend
  const fetchFeed = async () => {
    try {
      setIsLoading(true);
      // Logic: Using your verified IP address
      const response = await fetch('http://172.16.1.233:5000/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Connection Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <LinkedInHeader />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0A66C2" />
          <Text style={styles.loadingText}>Fetching your feed...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.feedContainer}
        >
          {/* Styling: Start a Post Entry */}
          <View style={styles.postTriggerContainer}>
            <Image
              source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Harsha' }}
              style={styles.userSmallAvatar}
            />
            <TouchableOpacity 
              style={styles.fakeInputPill} 
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.fakeInputText}>Start a post</Text>
            </TouchableOpacity>
          </View>

          {/* Dynamic Logic: Rendering posts from MongoDB */}
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
      )}

      {/* Functionality: Create Post Modal */}
      <Modal visible={isModalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={28} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity 
               style={[styles.postBtn, !postContent && {opacity: 0.5}]}
               disabled={!postContent}
            >
              <Text style={styles.postBtnText}>Post</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.modalInput}
            placeholder="What do you want to talk about?"
            multiline
            value={postContent}
            onChangeText={setPostContent}
            autoFocus
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

/**
 * Placeholder Screens for Tabs
 */
const NetworkScreen = () => <View style={styles.centered}><Text>My Network</Text></View>;
const NotificationsScreen = () => <View style={styles.centered}><Text>Notifications</Text></View>;
const JobsScreen = () => <View style={styles.centered}><Text>Jobs</Text></View>;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any = 'home';
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
            tabBarStyle: { height: 65, paddingBottom: 10 },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Network" component={NetworkScreen} />
          <Tab.Screen name="Post" component={HomeScreen} /> 
          <Tab.Screen name="Notifications" component={NotificationsScreen} />
          <Tab.Screen name="Jobs" component={JobsScreen} />
        </Tab.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3F2EF' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#666', fontWeight: '500' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: 12,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    elevation: 2,
  },
  profileImage: { width: 34, height: 34, borderRadius: 17 },
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
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15 },
  postTriggerContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
  },
  userSmallAvatar: { width: 40, height: 40, borderRadius: 20 },
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
  fakeInputText: { color: '#666666', fontSize: 14, fontWeight: '600' },
  feedContainer: { paddingBottom: 20 },
  // Modal Styling
  modalContent: { flex: 1, backgroundColor: '#FFF' },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  postBtn: { backgroundColor: '#0A66C2', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  postBtnText: { color: '#FFF', fontWeight: 'bold' },
  modalInput: { flex: 1, padding: 20, fontSize: 18, textAlignVertical: 'top' }
});