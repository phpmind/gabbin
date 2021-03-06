const Code = require('code');
const Lab = require('lab');
const RimRaf = require('rimraf');

const App = require('../app');

const lab = exports.lab = Lab.script();

const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;
const afterEach = lab.afterEach;

const levelPath = './.temp';

describe('converse', () => {
  afterEach(done => {
    RimRaf.sync(levelPath);
    done();
  });
  
  // TODO: change to websocket tests
  it('returns a string that matches the value of querystring q', { parallel: false}, done => {
    App.init({port: 0, path: levelPath, isTest: true}, (err, server) => {
      server.inject({ method: 'GET', url: '/converse?q=foo'}, response => {
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.equal('foo');
        done();
      });
    });
  });
});
