import Product from '../models/products';
import slugify from 'slugify';

export const creatProduct = async (req, res) => { // create product
  req.body.slug = slugify(req.body.name);
  console.log(req.body);
  try {
    const product = await new Product(req.body).save()
    res.json(product);
    console.log(product);
  } catch (error) {
    res.status(400).json({
      message: "Thêm sản phẩm không thành công"
    })
  }
}


export const list = async (req, res) => { // get all
  // get all
  const { name } = req.query;
  if (name) {
    try {
      const product = await Product.find({ name: new RegExp(name, 'i') }).exec();
      res.json(product);
    } catch (error) {
      res.status(400).json({
        message: "không tìm thấy"
      })
    }
  } else {
    try {
      const products = await Product.find().exec();
      res.json(products);
    } catch (error) {
      res.status(400).json({
        message: 'Hiện sản phẩm không thành công',
      });
    }
  }

};
export const get = async (req, res) => { // get a product detail
  // get a product
  try {
    const products = await Product.findOne({ _id: req.params.id }).exec();
    console.log(req.params.id); //params trả về 1 objec
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: 'Thêm sản phẩm không thành công',
    });
  }
};
// export const create = async (req, res) => {
//   console.log(req.body);
//   // create product
//   try {
//     const product = await new Product(req.body).save();
//     res.json(product);
//   } catch (error) {
//     res.status(400).json({
//       message: 'Thêm sản phẩm không thành công',
//     });
//   }
// };
export const remove = async (req, res) => { // delete product
  // delete product
  try {
    const products = await Product.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: 'Xóa sản phẩm không thành công',
    });
  }
};
export const update = async (req, res) => { // update product
  // update product
  const condition = { _id: req.params.id };
  const update = req.body;
  const optional = { new: true };
  try {
    const products = await Product.findOneAndUpdate(
      condition,
      update,
      optional,
    ).exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: 'update sản phẩm không thành công',
    });
  }
};