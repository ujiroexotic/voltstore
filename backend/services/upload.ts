import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";

const productStorage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category;
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

export const uploadProductImages = multer({ storage: productStorage });
