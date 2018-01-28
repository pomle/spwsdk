import { CoreAPI } from './Core.js';

export class UserAPI extends CoreAPI {
  getMe() {
    return this.request(this.url('v1/me'));
  }

  getMyPlaylists() {
    return this.request(this.url(`v1/me/playlists`));
  }

  getUser(userId) {
    return this.request(this.url(`v1/users/${userId}`));
  }
}
