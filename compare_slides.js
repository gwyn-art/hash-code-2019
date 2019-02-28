const compareTwoSlides = (
  x = {tags: []}, 
  y = {tags: []}) => {
    return Math.min(...[
      x.tags.filter(tag => y.tags.includes(tag)).length, 
      x.tags.filter(tag => !y.tags.includes(tag)).length,
      y.tags.filter(tag => !x.tags.includes(tag)).length
    ]);
}

const compareSlides = (slides) => {
  const res = [];
}