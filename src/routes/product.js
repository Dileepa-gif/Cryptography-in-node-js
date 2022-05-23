import { Router } from "express";
const ProductrRouter = Router();
import "@babel/polyfill";

import {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProducts,
} from "../controllers/product.controller";

ProductrRouter.get("/", getProducts);
ProductrRouter.get("/:id", getProduct);
ProductrRouter.post("/", createProduct);
ProductrRouter.delete("/:id", deleteProduct);
ProductrRouter.put("/:id", updateProducts);

export default ProductrRouter;
