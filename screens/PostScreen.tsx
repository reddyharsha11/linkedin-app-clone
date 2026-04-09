import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Make sure this matches your current local IP!
const POST_URL = 'http://172.16.2.136:5000/uplodpost';

export default function PostScreen({ navigation }: any): React.JSX.Element {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const userStr = await AsyncStorage.getItem('userData');
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      }
    };
    loadUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
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
          profileName: currentUser?.name || 'LinkedIn Member',
          headline: currentUser?.headline || 'Member',
          description: postContent,
          postImage: selectedImage || '',
          time: 'Just now'
        }),
      });

      if (response.ok) {
        // Clear the form
        setPostContent('');
        setSelectedImage(null);
        // Navigate back to the Home Feed!
        navigation.navigate('Home');
      } else {
        Alert.alert("Error", "Server failed to save post.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Check your backend terminal.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Share Post</Text>
        <TouchableOpacity 
          style={[styles.postBtn, (!postContent && !selectedImage || isPosting) && { opacity: 0.5 }]}
          onPress={handleCreatePost}
          disabled={(!postContent && !selectedImage) || isPosting}
        >
          {isPosting ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.postBtnText}>Post</Text>}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <Image 
  source={{ uri: currentUser?.avatar || `https://api.dicebear.com/7.x/initials/png?seed=${currentUser?.name || 'User'}&backgroundColor=0A66C2` }} 
  style={styles.avatar} 
/>
          <Text style={styles.userName}>{currentUser?.name || 'Loading...'}</Text>
        </View>

        {/* Text Input */}
        <TextInput
          style={styles.input}
          placeholder="What do you want to talk about?"
          multiline
          autoFocus
          value={postContent}
          onChangeText={setPostContent}
        />

        {/* Image Preview */}
        {selectedImage && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            <TouchableOpacity style={styles.removeImageBtn} onPress={() => setSelectedImage(null)}>
              <Ionicons name="close" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="image-outline" size={26} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}>
          <Ionicons name="videocam-outline" size={26} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}>
          <Ionicons name="document-text-outline" size={26} color="#666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  postBtn: { backgroundColor: '#0A66C2', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  postBtnText: { color: '#FFF', fontWeight: 'bold' },
  content: { flex: 1, padding: 15 },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { fontSize: 16, fontWeight: 'bold' },
  input: { fontSize: 18, textAlignVertical: 'top', color: '#000', minHeight: 100 },
  imagePreviewContainer: { marginTop: 15, position: 'relative' },
  previewImage: { width: '100%', height: 300, borderRadius: 10 },
  removeImageBtn: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.6)', padding: 5, borderRadius: 15 },
  toolbar: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderColor: '#EEE', backgroundColor: '#F9F9F9' }
});