import {User} from '../User.tsx';

export interface UserRepository {
  googleSignIn(): Promise<User>;

  signIn(email: string, password: string): Promise<User>;

  login(): Promise<User>;

  logout(): Promise<void>;

  getCurrentUser(): User | null;
}
