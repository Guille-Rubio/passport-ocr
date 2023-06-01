const IJS = require("image-js").Image;
const  getMrz  = require("../getMrz");

export async function cropMrz(imageData) {
  const result = {};
  try {
    await getMrz(await IJS.load(imageData), {
      debug: true,
      out: result,
    });
  } catch (e) {
    if(e.message ==="no roi found"){
      console.log("No se encontró la zona de datos")
    }
    console.error(e);
  }
 
  return result;
}
