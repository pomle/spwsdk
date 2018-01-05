import '../vendor/spotify-player.js';

import {PlaybackAPI, PlaylistAPI} from './API.js';

const playerPromise = new Promise(resolve => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    console.log('onSpotifyWebPlaybackSDKReady');
    resolve(window.Spotify);
  };
});

export {
  PlaybackAPI,
  PlaylistAPI,
};

export async function getSpotify() {
  return playerPromise;
}

export async function createPlayer(token) {
  const Spotify = await getSpotify();
  const player = new Spotify.Player({
    name: 'Cordless',
    getOAuthToken: callback => {
      callback(token);
    },
    volume: 1,
  });
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
