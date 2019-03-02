const fs = require('fs');
const parse = require('./parseInput');
const mergeTags = require('./combineVerticalTags');

const countScore = (a, b) => {
  let common = a.tags.filter(t => b.tags.includes(t)).length;
  return Math.min(
    a.tags.length - common,
    common,
    b.tags.length - common
  );
};

const task = () => {
  // let time = new Date();
  // console.log(`${time.getUTCHours()}:${time.getUTCMinutes()}`);
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
      let left = i - 1 > -1 ? countScore(acc[i - 1], cur) : null;
      let right = i < acc.length ? countScore(acc[i], cur) : null;
      if (left === 0 || right === 0) continue;
      let prevScore = null;
      if (left !== null && right !== null) {
        prevScore = countScore(acc[i -1], acc[i]);
      }
      if (left + right > score && left + right > prevScore) {
        index = i;
        score = left + right;
        first = left === null;
        last = right === null;
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
  console.log('sorted');
  [1, 2, 3, 4, 5].forEach(() => {
    zero = zero.filter(cur => {
      let index = null;
      let score = 0;
      let first = false;
      let last = false;
      for (let i = 0; i <= sortedSlides.length; i++) {
        let left = i - 1 > -1 ? countScore(sortedSlides[i - 1], cur) : null;
        let right = i < sortedSlides.length ? countScore(sortedSlides[i], cur) : null;
        if (left === 0 || right === 0) continue;
        let prevScore = null;
        if (left !== null && right !== null) {
          prevScore = countScore(sortedSlides[i - 1], sortedSlides[i]);
        }
        if (left + right > score && left + right > prevScore) {
          index = i;
          score = left + right;
          first = left === null;
          last = right === null;
        }
      }
      if (index !== null) {
        if (first) sortedSlides = [cur].concat(sortedSlides);
        else if (last) sortedSlides = sortedSlides.concat([cur]);
        else sortedSlides = sortedSlides.slice(0, index).concat([cur]).concat(sortedSlides.slice(index));
        return false;
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
  // time = new Date();
  // console.log(`${time.getUTCHours()}:${time.getUTCMinutes()}`);
};

task();
