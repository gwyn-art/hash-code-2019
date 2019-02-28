const sortSlides = (slides = []) => {
  const res = [slides[0]];
  slides = slides.slice(1, slides.length);

  for (let i = 0; i < slides.length) {
    let best = {max: 0, i: 0};

    for (let j = 0; j < res.length + 1; j++) {
      const temp = [ ...res.slice(0, i), slides[i], ...res.slice(i, res.length)];
      if () {}
    }
  }
}