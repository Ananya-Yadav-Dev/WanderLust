const Joi = require('joi');
const ApiError = require("../utils/ApiError");

const allowedCategories = ["Urban", "Nature", "Beach", "Luxury", "Other"];

const listingSchema = Joi.object({
  listing : Joi.object({
    title : Joi.string().required(),
    description : Joi.string().required(),
    location : Joi.string().required(),
    country: Joi.string().required(),
    price : Joi.number().required().min(0),
    category: Joi.string().valid(...allowedCategories).required(),
    image: Joi.object({
      url: Joi.string().uri().allow("",null),
      filename: Joi.string().optional()
    }),
  }).required()
});

const reviewSchema = Joi.object({
  review : Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  })
});

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    return res.status(400).json({
      success: false,
      error: errMsg
    });
  }
  next();
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    return res.status(400).json({
      success: false,
      error: errMsg
    });
  }
  next();
};

module.exports = {
  validateListing,
  validateReview
};
