import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CONSUMER_KEY!,
            clientSecret: process.env.TWITTER_CONSUMER_SECRET!
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            if (profile) {
                token['userProfile'] = {
                    followersCount: profile.followers_count,
                    twitterHandle: profile.screen_name,
                    userID: profile.id
                };
            }
            if (account) {
                token['credentials'] = {
                    authToken: account.oauth_token,
                    authSecret: account.oauth_token_secret,
                }
            }
            return token
        },
        async session({session, token, user}) {
            // Send properties to the client, like an access_token from a provider.
            let userData = JSON.parse(JSON.stringify(token.userProfile));
            delete userData.userID;
            session.twitter = userData;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        error: '/error', // Error code passed in query string as ?error=
    }
})
