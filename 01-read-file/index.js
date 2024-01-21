const fs = require('fs');
const path = require('path');

// const rs = new fs.ReadStream('./01-read-file/text.txt', { encoding: 'utf-8' });
const rs = new fs.ReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf8',
});

rs.on('data', function (dataChunk) {
  console.log(dataChunk);
});

rs.on('end', function () {
  console.log('reading has ended');
});

rs.on('error', function (err) {
  console.error('an error has occurred :', err);
});

// rs.on('readable', function () {
//   const data = rs.read();
//   if (data != null) console.log(data);
// });
