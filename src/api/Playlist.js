import { trackURI } from '../uri.js';
import { CoreAPI } from './Core.js';

const DEFAULT_OPTIONS = {
  offset: 0,
  limit: 100,
};

export class PlaylistAPI extends CoreAPI {
  addTracks(userId, playlistId, trackIds, position = null) {
    const payload = {
      uris: trackIds.map(trackURI),
    };

    if (position !== null) {
      payload.position = position;
    }

    return this.request(
      this.url(`v1/users/${userId}/playlists/${playlistId}/tracks`),
      payload,
      'POST',
    );
  }

  getPlaylists(userId = 'me') {
    return this.request(this.url(`v1/${userId}/playlists`));
  }

  getPlaylist(userId, playlistId, params = null) {
    return this.request(
      this.url(`v1/users/${userId}/playlists/${playlistId}`, params),
    );
  }

  getPlaylistTracks(userId, playlistId, options = DEFAULT_OPTIONS) {
    return this.request(
      this.url(`v1/users/${userId}/playlists/${playlistId}/tracks`, Object.assign({}, DEFAULT_OPTIONS, options))
    );
  }

  removeTrack(userId, playlistId, snapshotId, trackId, position) {
    const payload = {
      snapshot_id: snapshotId,
      tracks: [
        {
          uri: trackURI(trackId),
          positions: [position],
        },
      ],
    };

    return this.request(
      this.url(`v1/users/${userId}/playlists/${playlistId}/tracks`),
      payload,
      'DELETE',
    );
  }
}
