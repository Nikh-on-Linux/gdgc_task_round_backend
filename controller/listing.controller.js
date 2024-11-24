import { Product } from "../model.js";
import { generateProductId } from "../utlis.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export async function getList(req, res) {

  await Product.find({}).then(data => {
    if (data) {
      res.json({ data: data })
    }
    else {
      res.json({ msg: "No product list found" });
    }
  })

}

export async function addProduct(req, res) {

  const { title, description, price, seller } = req.body;
  const productId = generateProductId();

  console.log(title, description, price, seller)

  const newProduct = new Product({
    productId: productId,
    title: title,
    description: description,
    price: price,
    seller: seller,
    rating: (Math.random() * 5).toFixed(1)
  });

  const saveproduct = await newProduct.save()
    .then(response => {
      const filteredResponse = response.toObject();
      delete filteredResponse.createdAt;
      delete filteredResponse.updatedAt;
      delete filteredResponse._id;
      delete filteredResponse.__v;

      res.json({ data: filteredResponse })

    })
    .catch(err => {
      console.log(err);
      res.json({ msg: err });
    })

}


export async function getSelectedItem(req, res) {
  const productId = req.params.id;
  console.log(productId);
  await Product.findOne({ productId: productId })
    .then(response => {
      const filteredResponse = response.toObject();
      delete filteredResponse._id;
      delete filteredResponse.createdAt;
      delete filteredResponse.updatedAt;
      delete filteredResponse.__v;
      res.json({ data: filteredResponse })
    })
    .catch(err => {
      res.json({ data: err });
    })
}

export async function updateId(req, res) {

  const productId = req.params.id;
  const { title, description, rating } = req.body;

  await Product.updateOne({ productId: productId }, {
    $set: {
      title: title,
      description: description,
      rating: rating
    }
  })

    .then(async () => {
      await Product.findOne({ productId: productId })
        .then(response => {
          const filteredResponse = response.toObject();
          delete filteredResponse._id;
          delete filteredResponse.createdAt;
          delete filteredResponse.updatedAt;
          delete filteredResponse.__v;
          res.json({ data: filteredResponse })
        })
        .catch(err => {
          res.json({ data: err });
        })
    })
}

export async function deleteProduct(req,res) {
  const productId = req.params.id;

  await Product.deleteOne({productId:productId})
  .then((response)=>{
    console.log(response);
    res.json({data:response})
  })
  .catch(err=>{
    res.json({data:err})
  })
}