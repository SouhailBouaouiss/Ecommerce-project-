import { handleUpload } from "../upload/cloudinary.js";

const postProduct = async (req, res, next) => {
  console.log("File ", req.file);
  if (!req.file)
    return res.status(422).send({ message: "No file is provided" });
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
    res.status(500).send({
      message: error.message,
    });
  }
};

export { postProduct };
