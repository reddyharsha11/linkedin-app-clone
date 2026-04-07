// 1. YOUR SPECIFIC IP (from ipconfig)
const DEV_IP = '172.16.1.233'; 

// 2. THE FULL BASE URL
// We use port 5000 because 
export const API_BASE_URL = `http://${DEV_IP}:5000`;

// 3. SPECIFIC ENDPOINTS
export const ENDPOINTS = {
  POSTS: `${API_BASE_URL}/posts`,
};