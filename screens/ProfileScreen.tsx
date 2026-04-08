import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileProps {
  navigation: any;
  onLogout: () => void;
}

export default function ProfileScreen({ navigation, onLogout }: ProfileProps): React.JSX.Element {
  const [userData, setUserData] = useState<any>(null);

  // Load the user's details when the screen opens
  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) setUserData(JSON.parse(data));
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    // Delete both the token and the user data to wipe the slate clean
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    onLogout();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.banner} />
        <Image
          source={{ uri: userData?.avatar || 'https://api.dicebear.com/7.x/avataaars/png?seed=User' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData?.name || 'LinkedIn Member'}</Text>
        <Text style={styles.headline}>{userData?.headline || 'Software Developer'}</Text>
        <Text style={styles.email}>{userData?.email || ''}</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F2EF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingBottom: 10, backgroundColor: '#FFF', elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  profileCard: { backgroundColor: '#FFF', marginTop: 8, paddingBottom: 25, alignItems: 'center', elevation: 1 },
  banner: { width: '100%', height: 100, backgroundColor: '#A0B4B7' },
  avatar: { width: 130, height: 130, borderRadius: 65, borderWidth: 4, borderColor: '#FFF', marginTop: -65, backgroundColor: '#FFF' },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 10, color: '#000' },
  headline: { fontSize: 16, color: '#666', marginTop: 5, textAlign: 'center', paddingHorizontal: 20 },
  email: { fontSize: 14, color: '#0A66C2', marginTop: 8, fontWeight: '600' },
  logoutButton: { margin: 20, backgroundColor: '#FFF', borderWidth: 2, borderColor: '#0A66C2', padding: 15, borderRadius: 25, alignItems: 'center' },
  logoutText: { color: '#0A66C2', fontSize: 18, fontWeight: 'bold' }
});