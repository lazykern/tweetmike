import {getCookie} from 'cookies-next';
import {NextApiRequest, NextApiResponse} from 'next';
import Twitter from 'twitter-lite';
import { TwitterApi } from 'twitter-api-v2';

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

  const client = new Twitter({
    version: '2',
    extension: false,
    consumer_key: process.env.TWITTER_CONSUMER_KEY!,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
    access_token_key: getCookie('twitter_access_token', {req, res})?.toString(),
    access_token_secret: getCookie('twitter_token_secret', {
      req,
      res,
    })?.toString(),
  });

  const userClient = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY!,
    appSecret: process.env.TWITTER_CONSUMER_SECRET!,
    accessToken: getCookie('twitter_access_token', {req, res})?.toString(),
    accessSecret: getCookie('twitter_token_secret', { req, res })?.toString(),

  })

  const roUserClient = userClient.readOnly.v2;

  const url = req.url!.replace('/api/2/', '');

  try {
    const result = await roUserClient.get(url);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};
