## OCR PWA APP TO SCAN PASSPORTS

MRZ: Machine Readable Zone 
- [MZR scanner](https://alsenet-labs.github.io/mrz-scanner/dist/index.html)
- [MZR scanner library](https://www.npmjs.com/package/mrz-scanner)
- How MZR [works](https://www.idenfy.com/blog/machine-readable-zone/)

#### cropping MRZ

- [MZR cropping module](https://github.com/image-js/mrz-detection)

This module must be edited to take an image buffer as input instead of using fs (run/getMrz.js)

ROI: Region of Interest


#### MRZ parsing

- [mrz](https://www.npmjs.com/package/mrz) npm library
parses MRZ and returns the corresponding fields


### npm libraries

- [react-camera](https://www.npmjs.com/package/react-webcam)
- [camera preview](https://blog.logrocket.com/using-filereader-api-preview-images-react/)

    Images taken in Base64

- [tesseract.js](https://github.com/naptha/tesseract.js/)
- [tesseract tutorial](https://publishing-project.rivendellweb.net/ocr-in-node-with-tesseract-js/)

- [tesseract](https://github.com/tesseract-ocr/tesseract)

[tesseract.js](https://github.com/naptha/tesseract.js/blob/master/docs/api.md#create-worker)

- [making tesseract efficient](https://github.com/naptha/tesseract.js/blob/master/docs/intro.md)


- [Buffer](https://www.npmjs.com/package/buffer) Library to use Buffer in React.

- [Uint8ToBase64](https://www.npmjs.com/package/uint8-to-base64)


### helper tools 

[convert base 64 to image](https://base64.guru/converter/decode/image)
[convert buffer to base64](https://stackoverflow.com/questions/65392241/how-convert-type-data-buffer-to-image-in-react-js)


### tutorials

[working with binary](https://medium.com/@wahidsaeed1/encoded-decoding-data-url-with-buffer-api-nodejs-41a28f435a1)

[data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)


### deployed in Render
[deploy](https://passport-ocr.onrender.com/)


Worker path??

## TODO
 (client side)
- Get Picture from camera/file
- Convert if necessary
- Crop MZR with mzr-detect
- Process MZR
- Save passport data

Add [cloudinary](https://cloudinary.com/ip/gr-sea-gg-brand-home-base?utm_source=google&utm_medium=search&utm_campaign=goog_selfserve_brand_wk22_replicate_core_branded_keyword&utm_term=1329&campaignid=17601148700&adgroupid=141182782954&keyword=cloudinary&device=c&matchtype=e&adposition=&gad=1&gclid=Cj0KCQjwpPKiBhDvARIsACn-gzAPgcWse-dZ74sd0tQEbiRXRdcA6EQgXnzx_DCsdiUigOVWL2MKzvMaAkddEALw_wcB) 