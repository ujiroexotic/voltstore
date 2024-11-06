import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";

const productStorage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "uploads", "products");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

//upload category images
const categoryStorage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "uploads", "categories");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  }
  ,
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
export const uploadCategoryImages = multer({ storage: categoryStorage });

export const uploadProductImages = multer({ storage: productStorage });