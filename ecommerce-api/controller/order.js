const Order = require("../model/Order");
const Joi = require("joi");
const Product = require("../model/Product");

const sotreOrderValidationSchema = Joi.object({
  products: Joi.array()
    .items({
      _id: Joi.required(),
      quantity: Joi.number().min(1).required(),
    })
    .min(1)
    .required(),
});


const createOrder = async (req, res, next) => {
  try {
    await sotreOrderValidationSchema.validateAsync(req.body, {
      allowUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).send({
      msg: "validation error",
      errors: err.details.map((el) => {
        return {
          field: el.context.key,
          msg: el.message,
        };
      }),
    });
  }

  try {

    let products = [];

    /* TODO: validation for qunaity check.. .. send 400 if quanity exceeds. */


    for (let index = 0; index < req.body.products.length; index++) {
      // req.body.products.forEach(async (el) => {
      let el = req.body.products[index];
      let dbProduct = await Product.findById(el._id);
      products.push({
        _id: el._id,
        title: dbProduct.title,
        rate: dbProduct.price,
        quantity: el.quantity,
      });
    }

    let order = await Order.create({
      products: products,
    });

    
      // this can also be done in mongoose post  save hook
     /*  
      let orderProducts = order.products;
        orderProducts.forEach(async (el) => {
        await Product.findByIdAndUpdate(el._id, {
          $inc: { inStock: -el.quantity },
        });
        }); 
      */
   

    res.send(order);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
};
