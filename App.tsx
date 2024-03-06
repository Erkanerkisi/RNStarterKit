import React, {useEffect, useState} from 'react';
import AppStackNav from './src/routes/AppStackNav.tsx';
import {AuthContext, AuthCtx} from './src/contexts/AuthContext.tsx';
import {User} from './src/domain/User.tsx';
import {UserRepository} from './src/domain/auth/UserRepository.tsx';
import FirebaseUserImpl from './src/infrastructure/auth/FirebaseUserImpl.tsx';

function App(): React.JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const userRepository: UserRepository = new FirebaseUserImpl();
    let currentUser = userRepository.getCurrentUser();
    if (currentUser != null) {
      setUser(currentUser);
    }
  }, []);

  const contextValue: AuthCtx = {
    user: user,
    setUser: setUser,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      <AppStackNav />
    </AuthContext.Provider>
  );
}

export default App;
