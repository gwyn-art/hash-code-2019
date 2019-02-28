const fs = require('fs');

const parse = () => {
  const file = (fs.readFileSync('assets/a_example.txt')).toString().split('\n');
  let res = [];
  for (let i = 1; i < parseInt(file[0]); i++) {
    let raw = file[i].split(' ');
    let tags = raw.slice(2, 2 + raw[1]);
    res.push({
      type: raw[0],
      tags,
      index: i - 1
    });
  }
  console.log(res);
};

parse();
