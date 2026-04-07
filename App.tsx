import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PostCard from './components/Postcard';

// ARCHITECTURE: Define the base URLs
const BASE_URL = 'http://172.16.1.233:5000';
const GET_URL = `${BASE_URL}/getallposts`;
const POST_URL = `${BASE_URL}/uplodpost`;

// FIX: Move these OUTSIDE the App component to stop the warnings
const NetworkScreen = () => <View style={styles.centered}><Text>Network Screen</Text></View>;
const NotificationsScreen = () => <View style={styles.centered}><Text>Notifications Screen</Text></View>;
const JobsScreen = () => <View style={styles.centered}><Text>Jobs Screen</Text></View>;

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
      <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#666" />
      <Ionicons name="qr-code-outline" size={18} color="#666" />
    </View>
    <TouchableOpacity activeOpacity={0.7}>
      <Ionicons name="chatbubble-ellipses" size={26} color="#666" />
    </TouchableOpacity>
  </View>
);

const HomeScreen = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const fetchFeed = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(GET_URL);
      
      // LOGIC: Check if it's actually JSON before parsing
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        setPosts(data);
      } else {
        const text = await response.text();
        console.log("SERVER RETURNED NON-JSON (Likely HTML Error):", text);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;
    try {
      setIsPosting(true);
      const response = await fetch(POST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileName: 'B Harshavardhan Reddy',
          headline: 'Software Developer Intern @ NxtWave',
          description: postContent,
          postImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
          time: 'Just now'
        }),
      });
      if (response.ok) {
        setPostContent('');
        setModalVisible(false);
        fetchFeed();
      }
    } catch (error) {
      Alert.alert("Error", "Check Connection");
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => { fetchFeed(); }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <LinkedInHeader />
      {isLoading ? (
        <View style={styles.centered}><ActivityIndicator size="large" color="#0A66C2" /></View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.feedContainer}>
          <View style={styles.postTriggerContainer}>
            <Image source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Harsha' }} style={styles.userSmallAvatar} />
            <TouchableOpacity style={styles.fakeInputPill} onPress={() => setModalVisible(true)}>
              <Text style={styles.fakeInputText}>Start a post</Text>
            </TouchableOpacity>
          </View>
          {posts.map((item) => (
            <PostCard key={item._id} {...item} />
          ))}
        </ScrollView>
      )}
      <Modal visible={isModalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close" size={28} color="#666" /></TouchableOpacity>
            <TouchableOpacity 
               style={[styles.postBtn, (!postContent || isPosting) && {opacity: 0.5}]}
               onPress={handleCreatePost}
               disabled={!postContent || isPosting}
            >
              <Text style={styles.postBtnText}>{isPosting ? '...' : 'Post'}</Text>
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

const Tab = createBottomTabNavigator();

export default function App() {
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
          <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} /> }} />
          <Tab.Screen name="Network" component={NetworkScreen} options={{ tabBarIcon: ({color}) => <Ionicons name="people" size={24} color={color} /> }} />
          <Tab.Screen name="Post" component={HomeScreen} options={{ tabBarIcon: ({color}) => <Ionicons name="add-circle" size={24} color={color} /> }} />
          <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ tabBarIcon: ({color}) => <Ionicons name="notifications" size={24} color={color} /> }} />
          <Tab.Screen name="Jobs" component={JobsScreen} options={{ tabBarIcon: ({color}) => <Ionicons name="briefcase" size={24} color={color} /> }} />
        </Tab.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3F2EF' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingBottom: 12, paddingHorizontal: 15, justifyContent: 'space-between', elevation: 2 },
  profileImage: { width: 34, height: 34, borderRadius: 17 },
  searchSection: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF3F8', marginHorizontal: 12, paddingHorizontal: 10, borderRadius: 4, height: 36 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#000' },
  postTriggerContainer: { backgroundColor: '#FFF', padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 8, elevation: 2 },
  userSmallAvatar: { width: 40, height: 40, borderRadius: 20 },
  fakeInputPill: { flex: 1, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#666', marginLeft: 12, justifyContent: 'center', paddingHorizontal: 16 },
  fakeInputText: { color: '#666', fontSize: 14, fontWeight: '600' },
  feedContainer: { paddingBottom: 20 },
  modalContent: { flex: 1, backgroundColor: '#FFF' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  postBtn: { backgroundColor: '#0A66C2', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  postBtnText: { color: '#FFF', fontWeight: 'bold' },
  modalInput: { flex: 1, padding: 20, fontSize: 18, textAlignVertical: 'top', color: '#000' }
});