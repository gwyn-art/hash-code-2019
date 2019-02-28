const compareTwoSlides = (
  x = {tags: []}, 
  y = {tags: []}) => {
    if (!x || !y) return 0;

    return Math.min(...[
      x.tags.filter(tag => y.tags.includes(tag)).length, 
      x.tags.filter(tag => !y.tags.includes(tag)).length,
      y.tags.filter(tag => !x.tags.includes(tag)).length
    ]);
}

const compareSlides = (slides) => {
  return slides.reduce((res, x, i, arr) => 
      [
        ...res, 
        {
          left: compareTwoSlides(arr[i - 1], x),
          right: compareTwoSlides(x, arr[i + 1])
        }
      ], 
      []
    );
}