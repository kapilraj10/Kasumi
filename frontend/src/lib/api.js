import { axiosInstance } from "./axios";

// User Signup
export const signup = async (signupData) => {
  const response = await axiosInstance.post('/auth/signup', signupData);
  return response.data;
};

// User Login
export const login = async (loginData) => {
  const response = await axiosInstance.post('/auth/login', loginData);
  return response.data;
};

// Get Authenticated User
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.error("Error in getAuthUser:", error.response?.data || error.message);
    return null;
  }
};

// Complete Onboarding
export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

// User Logout
export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

// Get user's friends list
export const getUserFriends = async () => {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
};

// Get recommended users
export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

// Get outgoing friend requests (sent by user)
export const getOutgoingFriendReqs = async () => {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
};

// Send a friend request to another user
export const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
};

// Get incoming friend requests (received by user)
export const getFriendRequests = async () => {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
};

// Get incoming friend requests (accept by user)
export async function acceptFriendRequest(requestId) {
  const res = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return res.data;
}

// chat request
export async function getStreamToken() {
  const res = await axiosInstance.get("chat/token");
  return res.data;
}