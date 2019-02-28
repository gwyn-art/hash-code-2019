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
    let result = []

    for (let i = 0; i < arrayOfVert.length; i++) {
        let base = arrayOfVert[0];
        let rest = arrayOfVert.slice(1, arrayOfVert.length);
        let slideToadd = {};
        let pairedPhotoIndex = 0; 

        max = 0;
        
        for (let j = 0; j < rest.length; j++) {
            localMax = combineVerticalTags(base, rest[j]).length;
            console.log(localMax)
            if (localMax > max) {
                slideToadd = generateVerticalSlide(base, rest[j]);
                max = 0;
            }
        }

        arrayOfVert.splice(0, 1);
        arrayOfVert.splice(pairedPhotoIndex + 1, 1);

        result.push(slideToadd);
    }

    return result;
}

module.exports = getVertSlides;