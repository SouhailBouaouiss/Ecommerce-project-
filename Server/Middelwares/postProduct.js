import { handleUpload } from "../upload/cloudinary.js";

const postProduct = async (req, res, next) => {
  console.log(req.file);
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);

    console.log(cldRes);

    const fileURL = cldRes.url;

    req.product = { ...req.body, product_image: fileURL };
    next();
    return;
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
};

export { postProduct };
