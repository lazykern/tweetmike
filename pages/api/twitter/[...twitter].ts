import {getCookie} from 'cookies-next';
import {NextApiRequest, NextApiResponse} from 'next';
import {TwitterApi} from 'twitter-api-v2';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    res.status(405).json({error: 'Method Not Allowed'});
  }

  if (!req.query) {
    return res.status(400).json({error: 'Missing query'});
  }

  if (
    !getCookie('twitter_access_token', {req, res}) ||
    !getCookie('twitter_token_secret', {req, res})
  ) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  console.log(process.env.TWITTER_CONSUMER_KEY);
  console.log(process.env.TWITTER_CONSUMER_SECRET);
  console.log(getCookie('twitter_access_token', {req, res}));
  console.log(getCookie('twitter_token_secret', {req, res}));

  res.status(200).json({
    data: {},
  });
  //     const twitter = new TwitterApi({
  //         consumerKey: process.env.TWITTER_CONSUMER_KEY!,
  //         consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
  //         accessToken: getCookie('twitter_access_token', {req,res})?.toString(),
  //         accessTokenSecret: getCookie('twitter_token_secret', {req,res})?.toString()
  //     })

  //   const query = req.query;
  //   const response = await twitter.readOnly.v2.me();
  //     res.status(200).json(response);
};
