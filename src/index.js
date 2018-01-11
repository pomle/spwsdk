import 'babel-polyfill';
import '../vendor/spotify-player.js';

import {AlbumAPI, PlaybackAPI, PlaylistAPI, SearchAPI, TrackAPI} from './API.js';
import * as analysis from './analysis.js';

export {
  AlbumAPI,
  PlaybackAPI,
  PlaylistAPI,
  SearchAPI,
  TrackAPI,
  analysis,
};

const playerPromise = new Promise(resolve => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    console.log('onSpotifyWebPlaybackSDKReady');
    resolve(window.Spotify);
  };
});

export async function getSpotify() {
  return playerPromise;
}

export async function createPlayer(token, options) {
  const Spotify = await getSpotify();
  const player = new Spotify.Player(Object.assign({
    getOAuthToken: callback => callback(token),
  }, options));

  return player;
}

export function createAuthorizationURL(clientId, callbackURL) {
  return (
    'https://accounts.spotify.com/authorize?' +
    [
      ['client_id', clientId],
      ['redirect_uri', callbackURL],
      ['response_type', 'token'],
      [
        'scope',
        [
          'user-read-private',
          'user-read-playback-state',
          'user-modify-playback-state',
          'playlist-read-private',
          'playlist-read-collaborative',
          'streaming',
        ].join(' '),
      ],
    ]
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
  );
}
