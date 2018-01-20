import { CoreAPI, trackURI } from './Core.js';

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

  getPlaylistTracks(userId, playlistId) {
    return this.request(
      this.url(`v1/users/${userId}/playlists/${playlistId}/tracks`)
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
