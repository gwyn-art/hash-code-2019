const fs = require('fs');

const parse = (path) => {
  const file = (fs.readFileSync(path)).toString().split('\n');
  let res = [];
  for (let i = 1; i < parseInt(file[0]) + 1; i++) {
    let raw = file[i].split(' ');
    let tags = raw.slice(2, 2 + raw[1]);
    res.push({
      type: raw[0],
      tags,
      index: i - 1
    });
  }
  return res;
};

module.exports = parse;
