import {createContext} from 'react';
import {User} from '../domain/User.tsx';

export type AuthCtx = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};
export const AuthContext = createContext<AuthCtx | undefined>(undefined);
