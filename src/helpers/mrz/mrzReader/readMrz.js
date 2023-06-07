'use strict';

const mrzOcr = require('./internal/mrzOcr');
const roiOptions = {
    positive: true,
    negative: false,
    minSurface: 5,
    minRatio: 0.3,
    maxRatio: 3.0,
    algorithm: 'otsu',
    randomColors: true
};

async function readMrz(image, options = {}) {
    console.log(2)
    var { ocrResult, mask, rois } = await mrzOcr(image, roiOptions);

    if (options.saveName) {
        mask.save(options.saveName);
    }

    return { rois, mrz: ocrResult };
}

module.exports = readMrz;
