import Product from "../models/product";
import Sequelize from "sequelize";
import { decreption, encreption } from "../security/product";
const Op = Sequelize.Op;

export async function getProducts(req, res) {
  try {
    let getdata = await Product.findAll({});
    if (getdata) {
      let respoonse = await decreption(
        getdata,
        "array",
        "info@codesolution.co.in"
      );
      res.json({
        success: true,
        message: "Product Fetch Successfully",
        data: respoonse,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
}

export async function getProduct(req, res) {
  try {
    let createdata = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (createdata) {
      let respoonse = await decreption(
        createdata,
        "object",
        "info@codesolution.co.in"
      );
      res.json({
        success: true,
        message: "Product fetch Successfully",
        data: respoonse,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
}

export async function createProduct(req, res) {
  try {
      console.log(req.body);
    req.body.encreptionKey = "info@codesolution.co.in";
    let data = await encreption(req.body);
    console.log("data", data);
    let createdata = await Product.create(data, {
      fields: ["name", "price"],
    });
    console.log("createdata", createdata);
    if (createdata) {
      res.json({
        success: true,
        message: "Product Created Successfully",
        data: createdata,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    let deletedata = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedata) {
      res.json({
        success: true,
        message: "Product Created Successfully",
        data: deletedata,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
}

export async function updateProducts(req, res) {
  try {
    req.body.encreptionKey = "info@codesolution.co.in";
    let updatedata = await encreption(req.body);
    let finddata = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (finddata) {
      finddata.update(updatedata);
    }

    return res.json({
      success: true,
      message: "Product Created Successfully",
      data: finddata,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
}
