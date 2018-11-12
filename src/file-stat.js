/**
 * @license
 * Copyright Robin Buckley. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
'use strict';
const fs = require('fs');

const fileStat = (file) => {
  const promise = new Promise((resolve, reject) => {
    fs.stat(file, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
  return promise;
}

module.exports = fileStat;
