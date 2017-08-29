let fs = require('fs'),
    path = require('path');

describe('config.json to tree', () => {
  const EXPECTED = fs.readFileSync(path.resolve(__dirname,'./fixtures/expected.txt'), 'utf-8'),
        SOURCE = require('./fixtures/config.json');
  it('should reformat config into text tree', () => {
    require('..')(SOURCE).should.equal(EXPECTED);
  });
});
