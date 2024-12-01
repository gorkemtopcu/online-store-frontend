import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "lib/firebase";
import { generateFirebaseAuthErrorMessage } from "lib/firebase/auth/error";
import exceptionService from "./error/ExceptionService";

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

  logout() {
    try {
      auth.signOut();
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    if (error instanceof FirebaseError) {
      return generateFirebaseAuthErrorMessage(error);
    }
    return exceptionService.handleException(error);
  }
}

const authService = new AuthService();
export default authService;
