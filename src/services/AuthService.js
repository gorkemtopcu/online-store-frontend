import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "lib/firebase";
import { generateFirebaseAuthErrorMessage } from "lib/firebase/auth/error";

class AuthService {
  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up successfully. User: ", user);
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully. User: ", userCredential.user);
      const user = userCredential.user;
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  async logout() {
    try {
      await auth.signOut();
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error(error);
    if (error instanceof FirebaseError) {
      return generateFirebaseAuthErrorMessage(error);
    }
  }
}

const authService = new AuthService();
export default authService;
