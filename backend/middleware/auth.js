const { verifyToken } = require("../utils/jwtUtils");
const User = require("../models/User");
const Listing = require("../models/Listing");
const Review = require("../models/Review");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "You must be logged in to access this resource"
      });
    }

    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "User not found"
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token"
    });
  }
};

const isOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        error: "Listing not found"
      });
    }

    if (!listing.owner.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        error: "Only the listing owner can edit or delete this property."
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const isReviewAuthor = async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: "Review not found"
      });
    }

    if (!review.author.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        error: "Only the review author can delete this review."
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAuthenticated,
  isOwner,
  isReviewAuthor
};
