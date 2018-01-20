import { AlbumAPI } from './api/Album.js';
import { ArtistAPI } from './api/Artist.js';
import { PlaylistAPI } from './api/Playlist.js';
import { PlaybackAPI } from './api/Playback.js';
import { SearchAPI } from './api/Search.js';
import { TrackAPI } from './api/Track.js';
import { UserAPI } from './api/User.js';

import * as analysis from './analysis.js';

export {
  AlbumAPI,
  ArtistAPI,
  PlaybackAPI,
  PlaylistAPI,
  SearchAPI,
  TrackAPI,
  UserAPI,
  analysis,
};

const playerPromise = new Promise(resolve => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    console.log('onSpotifyWebPlaybackSDKReady');
    resolve(window.Spotify);
  };
});

export function getSpotify() {
  return playerPromise;
}

export function createPlayer(token, options) {
  return getSpotify()
  .then(Spotify => {
    const player = new Spotify.Player(Object.assign({
      getOAuthToken: callback => callback(token),
    }, options));

    return player;
  });
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
