const Review = require("../models/Review.js");
const Listing = require("../models/Listing.js");

module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  const populatedReview = await Review.findById(newReview._id).populate('author');

  res.status(201).json({
    success: true,
    data: populatedReview,
    message: "New Review Created!"
  });
};

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  res.json({
    success: true,
    message: "Review Deleted!"
  });
};
