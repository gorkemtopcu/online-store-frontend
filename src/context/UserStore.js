import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import authService from "services/AuthService";
import userService from "services/UserService";
import { db } from "lib/firebase";

const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,

  getUser: async (uid) => {
    set({ isLoading: true });
    if (!uid) {
      set({ currentUser: null, isLoading: false });
      return;
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const user = docSnap.data();
        set({ currentUser: user, isLoading: false });
        return;
      } else {
        set({ currentUser: null, isLoading: false });
        return;
      }
    } catch (error) {
      set({ currentUser: null, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (name, email, password, role) => {
    set({ isLoading: true });
    try {
      // Sign up the user
      const user = await authService.signUp(email, password);
      if (!user) {
        set({ isLoading: false });
        return;
      }
      // Create user in the database
      const userDoc = await userService.createUser({
        name: name,
        email: email,
        role: role,
        uid: user.uid,
      });
      set({ currentUser: userDoc });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const user = await authService.login(email, password);
      if (!user) {
        set({ isLoading: false });
        return;
      }
      const userDoc = await userService.getUserById(user.uid);
      set({ currentUser: userDoc });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
      set({ currentUser: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
