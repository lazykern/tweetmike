import {firebaseAuth} from '@modules/firebase';
import {deleteCookie, getCookie, hasCookie, setCookie} from 'cookies-next';
import {
  OAuthCredential,
  TwitterAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';

interface AuthContext {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  login: async () => undefined,
  logout: async () => undefined,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new TwitterAuthProvider();
    const result = await signInWithPopup(firebaseAuth, provider);
    if (result.user) {
      console.log('user', result);
      const resultCopy: any = {...result};
      const tokenResponse = await resultCopy._tokenResponse;
      setCookie('twitter_access_token', tokenResponse.oauthAccessToken);
      setCookie('twitter_token_secret', tokenResponse.oauthTokenSecret);
    }
  };

  const logout = async () => {
    setUser(null);
    deleteCookie('twitter_access_token');
    deleteCookie('twitter_token_secret');
    await signOut(firebaseAuth);
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
