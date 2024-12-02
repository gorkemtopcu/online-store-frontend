import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import authService from "services/AuthService";
import userService from "services/UserService";
import { db } from "lib/firebase";

const userStoreStates = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

const useUserStore = create((set, get) => ({
  currentUser: null,
  userState: userStoreStates.LOADING, // Default userState is loading
  error: null, // For error handling

  // Get user by UID
  getUser: async (uid) => {
    set({ userState: userStoreStates.LOADING, error: null }); // Start loading and reset errors
    if (!uid) {
      set({ currentUser: null, userState: userStoreStates.LOADED });
      return;
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const user = docSnap.data();
        set({ currentUser: user, userState: userStoreStates.LOADED }); // User found, loaded
      } else {
        set({ currentUser: null, userState: userStoreStates.LOADED }); // No user found, loaded
      }
    } catch (error) {
      set({
        currentUser: null,
        userState: userStoreStates.ERROR,
        error: error.message,
      }); // On error, update error userState
    }
  },

  // Sign up a new user
  signUp: async (name, email, password, role) => {
    set({ userState: userStoreStates.LOADING, error: null }); // Loading userState with reset error
    try {
      const user = await authService.signUp(email, password);
      if (!user) {
        set({ userState: userStoreStates.ERROR, error: "Sign up failed" }); // Error on sign up failure
        return;
      }

      // Create user in the database
      await userService.createUser({
        name: name,
        email: email,
        role: role,
        uid: user.uid,
      });

      const userDoc = await userService.getUserById(user.uid);

      set({ currentUser: userDoc, userState: userStoreStates.LOADED });
    } catch (error) {
      set({ userState: userStoreStates.ERROR, error: error.message }); // Catch and set error userState
    }
  },

  // Login an existing user
  login: async (email, password) => {
    set({ userState: userStoreStates.LOADING, error: null }); // Set loading userState
    try {
      const user = await authService.login(email, password);
      if (!user) {
        set({ userState: userStoreStates.ERROR, error: "Login failed" });
        return;
      }

      const userDoc = await userService.getUserById(user.uid);
      set({ currentUser: userDoc, userState: userStoreStates.LOADED });
    } catch (error) {
      set({ userState: userStoreStates.ERROR, error: error.message });
    }
  },

  // Logout user
  logout: async () => {
    set({ userState: userStoreStates.LOADING, error: null }); // Set loading userState
    try {
      await authService.logout();
      set({ currentUser: null, userState: userStoreStates.LOADED });
    } catch (error) {
      set({ userState: userStoreStates.ERROR, error: error.message });
    }
  },

  isLoading: () => {
    const userState = get();
    return userState.userState === userStoreStates.LOADING;
  },

  hasError: () => {
    const userState = get();
    return userState.userState === userStoreStates.ERROR;
  },
}));

export default useUserStore;
