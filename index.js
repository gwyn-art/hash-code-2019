const fs = require('fs');
const parse = require('./parseInput');
const mergeTags = require('./combineVerticalTags');
const sortSlides = require('./sortSlides');

const task = () => {
  let images = parse('assets/c_memorable_moments.txt');
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
  let sortedSlides = [slides[0]];
  slides = slides.filter(s => s.index !== slides[0].index);
  while (slides.length > 0) {
    console.log(slides.length);
    let index = null;
    let insertIndex = null;
    let score = 0;
    for (let j = 0; j < slides.length; j++) {
      for (let k = 0; k <= sortedSlides.length; k++) {
        let leftCommon = k - 1 > -1 ? slides[j].tags.filter(t => sortedSlides[k - 1].tags.includes(t)).length : null;
        let rightCommon = k < sortedSlides.length ? slides[j].tags.filter(t => sortedSlides[k].tags.includes(t)).length : null;
        if (leftCommon === 0 || rightCommon === 0) continue;
        if (leftCommon + rightCommon > score) {
          index = j;
          insertIndex = k;
        }
      }
    }
    if (index !== null) {
      console.log('here');
      sortedSlides = sortedSlides.reduce((acc, cur, i) => {
        if (i === insertIndex - 1) return acc.concat([cur, slides[index]]);
        return acc.concat(cur);
      }, []);
      slides = slides.filter(s => s.index !== slides[index].index);
    }
  }
  let score = 0;
  for (let i = 1; i < sortedSlides.length; i++) {
    score += Math.min(
      sortedSlides[i - 1].tags.filter(t => !sortedSlides[i].tags.includes(t)).length,
      sortedSlides[i - 1].tags.filter(t => sortedSlides[i].tags.includes(t)).length,
      sortedSlides[i].tags.filter(t => !sortedSlides[i - 1].tags.includes(t)).length,
      )
  }
  console.log(score);
  let output = `${sortedSlides.length}\n${sortedSlides.map(s => s.index).join('\n')}`
  fs.writeFile('output_a.txt', output);
};

task();
