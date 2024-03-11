const Order = require("../model/Order");
const Joi = require("joi");

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
    /* req.body.products */
    let products = [];

    /* TODO: code here to  populate price name 
    await Product.findById(product_id)
    products = [
       {
        "_id":"65eecf095f9316bd3772fe96",
        "quantity":1,
        price:100,
        name:watch
       }
    ]
    
    */

    let order = await Order.create({
      products: products,
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
};
