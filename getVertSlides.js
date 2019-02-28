const combineVerticalTags = require('./combineVerticalTags')

const generateVerticalSlide = (photo1, photo2) => {
    if (photo1.type === 'V' && photo2.type === 'V') {
        return {
            index: `${photo1.index} ${photo2.index}`,
            tags: combineVerticalTags(photo1, photo2)
        }
    }
}

const getVertSlides = (data) => {
    let arrayOfVert = data.filter(photo => photo.type === 'V');
    let result = [];

    arrayOfVert.sort((a, b) => (b.tags.length - a.tags.length));


    for (let i = 0; i < arrayOfVert.length; i=i+2) {
        let toAdd = generateVerticalSlide(arrayOfVert[i], arrayOfVert[i+1]);
        result.push(toAdd);
    }
    return result;
}

module.exports = getVertSlides;