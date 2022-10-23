var response = require('../indexResponse');

describe('index', () => {
    it('should return correct response for the index route', () => {
        expect(response.IndexResponse()).toBe('Nothing to respond');
    })
})