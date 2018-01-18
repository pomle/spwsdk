export function playlistURI(userId, playlistId) {
  return `spotify:user:${userId}:playlist:${playlistId}`;
}

export function albumURI(albumId) {
  return `spotify:album:${albumId}`;
}

export function trackURI(trackId) {
  return `spotify:track:${trackId}`;
}

export function encode(parts, ...values) {
    return values
    .map(encodeURIComponent)
    .reduce((string, value, index) => {
        return string + value + parts[index + 1];
    }, parts[0]);
}

export class CoreAPI {
  constructor(token) {
    this.base = 'https://api.spotify.com/';
    this.token = token;
  }

  consume(request, callback) {
    const handleRequest = (request) => {
      request
      .then(result => {
        if (result.items) {
          callback(result.items);
        }

        if (result.next) {
          handleRequest(this.request(result.next));
        }
      });
    }

    handleRequest(request);
  }

  request(url, body = null, method = 'GET') {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (this.token) {
      headers.append('Authorization', `Bearer ${this.token}`);
    }

    const req = new Request(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    return fetch(req).then(response => {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('application/json')) {
        return response.json();
      }

      return response.text();
    });
  }

  url(path, params = null) {
    let url = this.base;

    url += path;

    if (params) {
      url += '?' + params.map(pair => pair.map(encodeURIComponent).join('=')).join('&');
    }

    return url;
  }
}
