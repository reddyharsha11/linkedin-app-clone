import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PostCard from '../components/Postcard';

const BASE_URL = 'http://192.168.1.26:5000'; // Make sure this is your current IP!
const GET_URL = `${BASE_URL}/getallposts`;
const POST_URL = `${BASE_URL}/uplodpost`;

// Header now accepts the user's avatar and the navigation function
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
  const [currentUser, setCurrentUser] = useState<any>(null); // State for dynamic user data
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Load user data and posts when screen opens
  useEffect(() => {
    const loadUserData = async () => {
      const userStr = await AsyncStorage.getItem('userData');
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      }
    };
    loadUserData();
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(GET_URL);
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        setPosts(data.reverse());
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2, // Reduced quality slightly for faster uploads
      base64: true, // THIS FIXES THE CROSS-DEVICE IMAGE BUG!
    });

    if (!result.canceled && result.assets[0].base64) {
      // Create the Base64 text string
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setSelectedImage(base64Image);
    }
  };

  const handleCreatePost = async () => {
    if (!postContent.trim() && !selectedImage) return;

    try {
      setIsPosting(true);
      const response = await fetch(POST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // USE DYNAMIC USER DATA INSTEAD OF HARDCODED STRINGS
          profileName: currentUser?.name || 'LinkedIn Member',
          headline: currentUser?.headline || 'Member',
          description: postContent,
          postImage: selectedImage || '', 
          time: 'Just now'
        }),
      });

      if (response.ok) {
        setPostContent('');
        setSelectedImage(null);
        setModalVisible(false);
        fetchFeed();
      } else {
        Alert.alert("Error", "Server failed to save post.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Check your backend terminal.");
    } finally {
      setIsPosting(false);
    }
  };

  const fallbackAvatar = 'https://api.dicebear.com/7.x/avataaars/png?seed=User';

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <LinkedInHeader 
        userAvatar={currentUser?.avatar || fallbackAvatar} 
        onProfilePress={() => navigation.navigate('Profile')} // NAVIGATE TO PROFILE SCREEN
      />

      {isLoading ? (
        <View style={styles.centered}><ActivityIndicator size="large" color="#0A66C2" /></View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.feedContainer}>
          <View style={styles.postTriggerContainer}>
            <Image source={{ uri: currentUser?.avatar || fallbackAvatar }} style={styles.userSmallAvatar} />
            <TouchableOpacity style={styles.fakeInputPill} onPress={() => setModalVisible(true)}>
              <Text style={styles.fakeInputText}>Start a post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(true); pickImage(); }} style={{marginLeft: 15}}>
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

      {/* MODAL */}
      <Modal visible={isModalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => { setModalVisible(false); setSelectedImage(null); }}>
               <Ionicons name="close" size={28} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity 
               style={[styles.postBtn, (!postContent && !selectedImage || isPosting) && {opacity: 0.5}]}
               onPress={handleCreatePost}
               disabled={(!postContent && !selectedImage) || isPosting}
            >
              <Text style={styles.postBtnText}>{isPosting ? '...' : 'Post'}</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={{flex: 1}}>
            <TextInput style={styles.modalInput} placeholder="What do you want to talk about?" multiline value={postContent} onChangeText={setPostContent} autoFocus />
            {selectedImage && (
              <View style={{ padding: 15, position: 'relative' }}>
                <Image source={{ uri: selectedImage }} style={{ width: '100%', height: 300, borderRadius: 10 }} />
                <TouchableOpacity style={{ position: 'absolute', top: 25, right: 25, backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, borderRadius: 15 }} onPress={() => setSelectedImage(null)}>
                  <Ionicons name="close" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          <View style={{ padding: 15, borderTopWidth: 1, borderColor: '#EEE', flexDirection: 'row' }}>
            <TouchableOpacity onPress={pickImage}>
              <Ionicons name="image-outline" size={26} color="#666" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
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
  feedContainer: { paddingBottom: 20 },
  modalContent: { flex: 1, backgroundColor: '#FFF' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  postBtn: { backgroundColor: '#0A66C2', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  postBtnText: { color: '#FFF', fontWeight: 'bold' },
  modalInput: { flex: 1, padding: 20, fontSize: 18, textAlignVertical: 'top', color: '#000' }
});