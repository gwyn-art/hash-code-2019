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

const countTotalScore = (slides) => {
  let score = 0;
  for (let i = 1; i < slides.length; i++) {
    score += Math.min(
      slides[i - 1].tags.filter(t => !slides[i].tags.includes(t)).length,
      slides[i - 1].tags.filter(t => slides[i].tags.includes(t)).length,
      slides[i].tags.filter(t => !slides[i - 1].tags.includes(t)).length,
    )
  }
  return score;
};

const task = () => {
  // let time = new Date();
  // console.log(`${time.getUTCHours()}:${time.getUTCMinutes()}`);
  let images = parse('assets/b.txt');
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
  let tags = {};
  slides.forEach(s => s.tags.forEach(t => {
    if (tags.hasOwnProperty(t)) tags[t]++;
    else tags[t] = 1;
  }));
  slides = slides
    .map(s => ({...s, value: s.tags.reduce((acc, cur) => tags[cur] > acc ? tags[cur] : acc, 0)}))
    .sort((a, b) => {
      if (a.value > b.value) return -1;
      else if (a.value < b.value) return 1;
      return 0;
    });
  console.log('slides length: ', slides.length);

  let sorted = [slides.shift()];
  let sortedLength = 1;
  while (slides.length !== 0) {
    let index = null;
    let max = 0;
    for (let i = 0; i < slides.length; i++) {
      let score = countScore(sorted[0], slides[i]);
      if (score === 0) continue;
      let val = score  / Math.min(
        slides[i].tags.length,
        sorted[0].tags.length
      );
      if (val >= 0.25 && val <= 0.75) {
        index = i;
        break;
      }
      if (score > max) {
        index = i;
        max = score;
      }
    }
    if (index !== null) {
      sorted = [slides[index]].concat(sorted);
      slides = slides.slice(0, index).concat(slides.slice(index + 1));
    }
    index = null;
    max = 0;
    for (let i = 0; i < slides.length; i++) {
      let score = countScore(sorted[sorted.length - 1], slides[i]);
      let val = score  / Math.min(
        slides[i].tags.length,
        sorted[sorted.length - 1].tags.length
      );
      if (val >= 0.25 && val <= 0.75) {
        index = i;
        break;
      }
      if (score > max) {
        index = i;
        max = score;
      }
    }
    if (index !== null) {
      sorted.push(slides[index]);
      slides = slides.slice(0, index).concat(slides.slice(index + 1));
    }
    console.log(slides.length, sorted.length);
    if (sortedLength === sorted.length) break;
    else sortedLength = sorted.length;
  }

  console.log('sorted length: ', sorted.length);
  console.log('score: ', countTotalScore(sorted));
  let output = `${sorted.length}\n${sorted.map(s => s.index).join('\n')}`;
  fs.writeFile('output_b.txt', output);
  // time = new Date();
  // console.log(`${time.getUTCHours()}:${time.getUTCMinutes()}`);
};

task();
