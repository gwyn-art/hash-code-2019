const fs = require('fs');
const parse = require('./parseInput');
const mergeTags = require('./combineVerticalTags');

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
  }, []);
  console.log('slides length: ', slides.length);
  let tags = {};
  slides.forEach(s => s.tags.forEach(t => {
    if (tags.hasOwnProperty(t)) tags[t]++;
    else tags[t] = 1;
  }));
  slides = slides
    .map(s => ({...s, value: s.tags.reduce((acc, cur) => tags[cur] > 1 ? acc + 1 : acc, 0)}))
    .sort((a, b) => {
      if (a.value > b.value) return -1;
      else if (a.value < b.value) return 1;
      return 0;
    });
  let sortedSlides = [slides.shift()];
  let zero = [];
  sortedSlides = slides.reduce((acc, cur) => {
    let index = null;
    let score = 0;
    let first = false;
    let last = false;
    for (let i = 0; i <= acc.length; i++) {
      let left = i - 1 > -1 ? acc[i - 1].tags.filter(t => cur.tags.includes(t)).length : null;
      let right = i < acc.length ? acc[i].tags.filter(t => cur.tags.includes(t)).length : null;
      if (left === 0 || right === 0) continue;
      if (left + right > score) {
        index = i;
        score = left + right;
        if (left === null) first = true;
        else if (right === null) last = true;
        else left = right = false;
      }
    }
    if (index !== null) {
      if (first) return [cur].concat(acc);
      else if (last) return acc.concat([cur]);
      else return acc.slice(0, index).concat([cur]).concat(acc.slice(index));
    }
    zero.push(cur);
    return acc;
  }, sortedSlides);
  [1, 2, 3, 4, 5].forEach(() => {
    zero = zero.filter(cur => {
      for (let i = 0; i <= sortedSlides.length; i++) {
        let left = i - 1 > -1 ? sortedSlides[i - 1].tags.filter(t => cur.tags.includes(t)).length : null;
        let right = i < sortedSlides.length ? sortedSlides[i].tags.filter(t => cur.tags.includes(t)).length : null;
        if (left === 0 || right === 0) continue;
        if (left + right > 0) {
          if (left === null) sortedSlides = [cur].concat(sortedSlides);
          else if (right === null) sortedSlides = sortedSlides.concat([cur]);
          else sortedSlides = sortedSlides.slice(0, i).concat([cur]).concat(sortedSlides.slice(i));
          return false;
        }
      }
      return true;
    });
  });
  console.log('sorted length: ', sortedSlides.length);
  let score = 0;
  for (let i = 1; i < sortedSlides.length; i++) {
    score += Math.min(
      sortedSlides[i - 1].tags.filter(t => !sortedSlides[i].tags.includes(t)).length,
      sortedSlides[i - 1].tags.filter(t => sortedSlides[i].tags.includes(t)).length,
      sortedSlides[i].tags.filter(t => !sortedSlides[i - 1].tags.includes(t)).length,
      )
  }
  console.log('score: ', score);
  let output = `${sortedSlides.length}\n${sortedSlides.map(s => s.index).join('\n')}`;
  fs.writeFile('output_c.txt', output);
};

task();
