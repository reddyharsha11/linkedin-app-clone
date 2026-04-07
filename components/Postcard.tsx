import React from "react"; 
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface PostcardProps {
  profileName: string;
  headline: string;
  description: string;
  postImage?: string; // Made optional
  time: string;
}

const PostCard: React.FC<PostcardProps> = ({ profileName, headline, description, postImage, time }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${profileName || 'User'}` }} 
          style={styles.avatar} 
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>{profileName}</Text>
          <Text style={styles.headline} numberOfLines={1}>{headline}</Text>
          <Text style={styles.timeText}>{time} • <Ionicons name="globe" size={10} color="#666" /></Text>
        </View>
      </View>
      <Text style={styles.content}>{description}</Text>
      {postImage ? (
        <Image source={{ uri: postImage }} style={styles.image} />
      ) : null}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="thumbs-up-outline" size={20} color="#666" />
          <Text style={styles.footerText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.footerText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="repeat-outline" size={20} color="#666" />
          <Text style={styles.footerText}>Repost</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="paper-plane-outline" size={20} color="#666" />
          <Text style={styles.footerText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', marginTop: 8, paddingVertical: 12, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#E0E0E0' },
  header: { flexDirection: 'row', paddingHorizontal: 12, alignItems: 'center', marginBottom: 10 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F3F2EF' },
  headerTextContainer: { marginLeft: 12, flex: 1 },
  name: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  headline: { fontSize: 12, color: '#666' },
  timeText: { fontSize: 10, color: '#666' },
  content: { paddingHorizontal: 12, fontSize: 14, lineHeight: 20, color: '#000', marginBottom: 10 },
  image: { width: '100%', height: 300, resizeMode: 'cover', backgroundColor: '#F3F2EF' },
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#EEE', marginTop: 5 },
  footerButton: { flexDirection: 'row', alignItems: 'center' },
  footerText: { marginLeft: 5, fontSize: 13, color: '#666', fontWeight: '600' },
});

export default PostCard;