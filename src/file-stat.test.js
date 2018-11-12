/**
 * @license
 * Copyright Robin Buckley. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
'use strict';

const fs = require('fs');
const fileStat = require('./index');
const expect = require('chai').expect

const expectedContent = 'Hey';
const testFilePath = './read-file-promise-test-file.js';

describe('Stat Promise', () => {

  beforeEach(() => {
    const promise = new Promise((resolve, reject) => {
      fs.writeFile(testFilePath, expectedContent, 'utf8', (err, contents) => {
        if (!err) {
          resolve(contents);
        } else {
          throw(err);
          reject(err);
        }
      });
    });
    return promise;
  });

  after(() => {
    const promise = new Promise((resolve, reject) => {
      fs.stat(testFilePath, (err, stats) => {
        if (err) {
          return reject(err);
        }
        if (stats.isFile()) {
          fs.unlink(testFilePath, (err) => {
            if (err) {
              return reject(err);
            }
            return resolve();
          });
        }
      });
    });
    return promise;
  });

  it('should export a function', () => {
    expect(fileStat).to.be.a('function');
  });

  it('should return a promise', () => {
    expect(fileStat(testFilePath).then).to.be.a('function');
  });

  it('should handle an error (non-existent file)', (done) => {
    fileStat(testFilePath+'_fake')
      .then(
        (statFile) => {},
        (err) => {
          expect(true).to.equal(true);
          done();
        });
  });

  it('should stat the file', (done) => {
    fileStat(testFilePath).then((statFile) => {
      expect(statFile.size).to.equal(3);
      expect(statFile.isDirectory()).to.be.false;
      done();
    });
  });

});
