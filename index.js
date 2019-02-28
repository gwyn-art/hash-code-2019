const parse = require('./parseInput');
const mergeTags = require('./combineVerticalTags');

const task = () => {
  let images = parse('assets/a_example.txt');
  let v = null;
  let slides = images.reduce((acc, cur) => {
    if (cur.type === 'H') acc.push({
      index: cur.index.toString(),
      tags: cur.tags
    });
    else if (v === null) v = cur;
    else {
      acc.push({
        index: `${v.index} ${cur.index}`,
        tags: mergeTags(v, cur)
      });
      v = null;
    }
    return acc;
  }, [])
  console.log(slides);
};

task();
