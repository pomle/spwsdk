import { CoreAPI } from '../CoreAPI.js';

export class AlbumAPI extends CoreAPI {
  getAlbum(albumId) {
    return this.request(this.url(`v1/albums/${albumId}`));
  }
}
