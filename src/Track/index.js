import { CoreAPI } from '../CoreAPI.js';

export class TrackAPI extends CoreAPI {
  getAudioAnalysis(trackId) {
    return this.request(this.url(`v1/audio-analysis/${trackId}`));
  }
}