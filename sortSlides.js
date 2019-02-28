const compareSlides = require('./compare_slides');

const sortSlides = (slides = []) => {
  let res = [slides[0]];
  slides = slides.slice(1, slides.length);

  for (let i = 0; i < slides.length; i++) {
    let best = {max: 0, temp: []};

    for (let j = 0; j < res.length + 1; j++) {
      const temp = [ ...res.slice(0, j), slides[i], ...res.slice(j)];
      const tempRes = compareSlides(temp);

      if ( tempRes > best.max ) {
        best.max = tempRes;
        best.temp = temp;
      }

    }

    res = best.temp;

  }

  return res;
}

module.exports = sortSlides;