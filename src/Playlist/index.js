import { CoreAPI } from '../CoreAPI.js';

export class PlaylistAPI extends CoreAPI {
  getPlaylists(userId = 'me') {
    return this.request(this.url(`v1/${userId}/playlists`));
  }

  getPlaylist(userId, playlistId) {
    return this.request(
      this.url(`v1/users/${userId}/playlists/${playlistId}`)
    );
  }

  getPlaylistTracks(userId, playlistId) {
    return this.request(
      this.url(`v1/users/${userId}/playlists/${playlistId}/tracks`)
    );
  }
}
