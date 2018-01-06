import {CoreAPI} from '../CoreAPI.js';

describe('CoreAPI', () => {
    describe('#url()', () => {
        it('concatenates input with base URL', () => {
            const api = new CoreAPI();
            expect(api.url('my/test')).toBe('https://api.spotify.com/my/test');
        });

        it('supports query params', () => {
            const api = new CoreAPI();
            const params = [
                ['name', 'john'],
                ['with space', 'spe&ci?al'],
            ];
            expect(api.url('my/test', params))
                .toBe('https://api.spotify.com/my/test?name=john&with%20space=spe%26ci%3Fal');
        });
    })
});
