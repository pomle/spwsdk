import { CoreAPI } from '../CoreAPI.js';

export class PlaybackAPI extends CoreAPI {

  setDevice(deviceId) {
    this.deviceId = deviceId;
  }

  urlWithDevice(path, device_id) {
    if (!device_id) {
      throw new TypeError('Device id argument missing');
    }

    return this.url(`${path}?device_id=${device_id}`);
  }

  playAlbum(albumURI, trackURI) {
    return this.request(
      this.urlWithDevice('v1/me/player/play', this.deviceId),
      {
        context_uri: albumURI,
        offset: {
          [trackURI ? 'uri' : 'position']: trackURI || 1,
        }
      },
      'PUT'
    );
  }

  playContext(contextURI, device_id) {
    return this.request(
      this.urlWithDevice('v1/me/player/play', device_id),
      {
        context_uri: contextURI,
      },
      'PUT'
    );
  }

  playTracks(trackURIs, trackURI, device_id) {
    return this.request(
      this.urlWithDevice('v1/me/player/play', device_id),
      {
        uris: trackURIs,
        offset: {
          uri: trackURI,
        },
      },
      'PUT'
    );
  }

  resume() {
    return this.request(this.url('v1/me/player/play'), null, 'PUT');
  }

  pause() {
    return this.request(this.url('v1/me/player/pause'), null, 'PUT');
  }

  next() {
    return this.request(this.url('v1/me/player/next'), null, 'POST');
  }

  prev() {
    return this.request(this.url('v1/me/player/previous'), null, 'POST');
  }

  seek(ms) {
    return this.request(this.url('v1/me/player/seek', [['position_ms', ms]]), null, 'PUT');
  }
}
