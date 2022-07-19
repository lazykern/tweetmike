import React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import {
  OAuthCredential,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  User,
} from 'firebase/auth';
import {firebaseAuth} from '@modules/firebase';
import {setCookie, getCookie, hasCookie, deleteCookie} from 'cookies-next';

interface AuthContext {
  user: User | null;
  twitterCredential: OAuthCredential | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  twitterCredential: null,
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
  const [twitterCredential, setTwitterCredential] = useState<OAuthCredential | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        setUser(user);

        let twitterCredentialCookie = null;
        if (hasCookie('twitter_access_token') && hasCookie('twitter_secret')) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const accessToken = getCookie('twitter_access_token')!.toString();
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const secret = getCookie('twitter_secret')!.toString();
          twitterCredentialCookie = TwitterAuthProvider.credential(
            accessToken,
            secret
          );
        }
        setTwitterCredential(twitterCredentialCookie);
      } else {
        setUser(null);
        setTwitterCredential(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new TwitterAuthProvider();
    const result = await signInWithPopup(firebaseAuth, provider);
    if (result.user) {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      const secret = credential?.secret;

      setTwitterCredential(credential);
      setCookie('twitter_access_token', accessToken);
      setCookie('twitter_secret', secret);
    }
  };

  const logout = async () => {
    setUser(null);
    setTwitterCredential(null);
    deleteCookie('twitter_access_token');
    deleteCookie('twitter_secret');
    await signOut(firebaseAuth);
  };

  return (
    <AuthContext.Provider value={{user, twitterCredential, login, logout}}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
