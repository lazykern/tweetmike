import React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import {useAuth} from './AuthContext';
import {TwitterApi} from 'twitter-api-v2';

interface TwitterContext {
  appClient: TwitterApi | null;
  userClient: TwitterApi | null;
}

const TwitterContext = createContext<TwitterContext>({
  appClient: null,
  userClient: null,
});

export const useTwitter = () => useContext(TwitterContext);

export const TwitterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appClient, setAppClient] = useState<TwitterApi | null>(null);
  const [userClient, setUserClient] = useState<TwitterApi | null>(null);
  const [loading, setLoading] = useState(true);
  const {credential} = useAuth();

  useEffect(() => {
    if (credential) {
      const appClient = new TwitterApi(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN!
      );
      setAppClient(appClient);
      const userClient = new TwitterApi({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        appKey: process.env.NEXT_PUBLIC_TWITTER_APP_KEY!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        appSecret: process.env.NEXT_PUBLIC_TWITTER_APP_SECRET!,
      });
      setUserClient(userClient);
    } else {
      setAppClient(null);
      setUserClient(null);
    }
    setLoading(false);
  });

  return (
    <TwitterContext.Provider value={{appClient, userClient}}>
      {loading ? null : children}
    </TwitterContext.Provider>
  );
};
