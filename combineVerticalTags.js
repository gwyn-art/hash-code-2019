const combineVerticalTags = (vertical1, vertical2) => {
    let slideTags = new Set();
    if (vertical1.type === 'V' && vertical2.type === 'V') {
        vertical1.tags.map(tag => slideTags.add(tag))
        vertical2.tags.map(tag => slideTags.add(tag))
    }
    const slideTagsArray = Array.from(slideTags)
    return slideTagsArray;
}
