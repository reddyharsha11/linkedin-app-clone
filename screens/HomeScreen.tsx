import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PostCard from '../components/Postcard';

const BASE_URL = 'http://172.16.2.136:5000';
const GET_URL = `${BASE_URL}/getallposts`;

const LinkedInHeader = ({ userAvatar, onProfilePress }: any) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity activeOpacity={0.7} onPress={onProfilePress}>
      <Image source={{ uri: userAvatar }} style={styles.profileImage} />
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

export default function HomeScreen({ navigation }: any): React.JSX.Element {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useFocusEffect runs every time you navigate back to this tab!
  useFocusEffect(
    React.useCallback(() => {
      const loadUserData = async () => {
        const userStr = await AsyncStorage.getItem('userData');
        if (userStr) setCurrentUser(JSON.parse(userStr));
      };
      
      const fetchFeed = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(GET_URL);
          const data = await response.json();
          setPosts(data.reverse());
        } catch (error) {
          console.error("Fetch Error:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadUserData();
      fetchFeed();
    }, [])
  );

const fallbackAvatar = `https://api.dicebear.com/7.x/initials/png?seed=${currentUser?.name || 'User'}&backgroundColor=0A66C2`;
  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <LinkedInHeader 
        userAvatar={currentUser?.avatar || fallbackAvatar} 
        onProfilePress={() => navigation.navigate('Profile')} 
      />

      {isLoading ? (
        <View style={styles.centered}><ActivityIndicator size="large" color="#0A66C2" /></View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.feedContainer}>
          
          {/* Post Trigger - Now navigates to PostScreen! */}
          <View style={styles.postTriggerContainer}>
            <Image source={{ uri: currentUser?.avatar || fallbackAvatar }} style={styles.userSmallAvatar} />
            <TouchableOpacity style={styles.fakeInputPill} onPress={() => navigation.navigate('Post')}>
              <Text style={styles.fakeInputText}>Start a post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Post')} style={{marginLeft: 15}}>
                <Ionicons name="image" size={24} color="#70B5F9" />
            </TouchableOpacity>
          </View>

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
    </SafeAreaView>
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
  feedContainer: { paddingBottom: 20 }
});