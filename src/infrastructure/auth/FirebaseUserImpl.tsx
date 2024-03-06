import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {User} from '../../domain/User.tsx';
import {UserRepository} from '../../domain/auth/UserRepository.tsx';

export default class FirebaseUserImpl implements UserRepository {
  getCurrentUser(): User | null {
    const currentUser = auth().currentUser;

    if (currentUser != null) {
      const {uid, displayName, email} = currentUser;

      return new User(uid, displayName, email);
    }
    return null;
  }

  async googleSignIn(): Promise<User> {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const signInResponse = await auth().signInWithCredential(
        googleCredential,
      );
      const {uid, displayName, email} = signInResponse.user;

      const user = new User(uid, displayName, email);
      return user;
    } catch (error) {
      console.error('Google Sign In error:', error);
      throw error;
    }
  }

  login(): Promise<User> {
    return Promise.resolve(new User('', '', ''));
  }

  async logout(): Promise<void> {
    await auth().signOut();
  }

  async signIn(emailAddress: string, password: string): Promise<User> {
    const userCredentials = await auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(res => {
        return res;
      })
      .catch(error => {
        console.log(error.code);
        throw error(error.code);
      });
    const {uid, displayName, email} = userCredentials.user;
    return new User(uid, displayName, email);
  }
}
