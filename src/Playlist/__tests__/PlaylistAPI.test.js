import {PlaylistAPI} from '../';

describe('PlaylistAPI', () => {
    const FAKE_RESULT = Symbol();

    describe('#getPlaylists()', () => {
        it('queries logged in users playlists if userId omitted', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.getPlaylists()).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/me/playlists');
        });

        it('queries specific playlists if userId given', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.getPlaylists('pomle')).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/pomle/playlists');
        });
    });

    describe('#getPlaylist()', () => {
        it('queries for a given playlist', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.getPlaylist('pomle', '29851vj901jf2ck')).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/users/pomle/playlists/29851vj901jf2ck');
        });
    });

    describe('#getPlaylistTracks()', () => {
        it('queries tracks for a given playlist', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.getPlaylistTracks('pomle', '29851vj901jf2ck')).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/users/pomle/playlists/29851vj901jf2ck/tracks');
        });
    });
});
